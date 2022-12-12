import distinctColors from 'distinct-colors';

let colorPalette = distinctColors({ count: 20 });

export class TreeStructure {
  constructor(rect, points, idx = "root") {
    this.rect = rect;
    this.points = points.filter((point) => this.contains(point[0], point[1]));
    this.idx = idx;
    this.children = [];
    this.colorPalette = colorPalette;
    this.color = colorPalette.pop();
    this.isSelected = false;

    this.calculate_avg_rent();
    this.calculate_avg_deviation();
    this.calculate_avg_difference();

    this.axis = undefined;
    this.axis_pos = undefined;
    this.hasTestPoint = false;
  }

  

  calculate_avg_rent() {
    if(this.points.length === 0) {
      this.avgRent = "?";
      return;
    }
    this.avgRent = 0;
    this.points.forEach((point) => {
      this.avgRent += point[2];
    });
    this.avgRent /= this.points.length;
  }

  calculate_avg_deviation() {
    if(this.points.length === 0) {
      this.avgDeviation = "?";
      return;
    }
    this.avgDeviation = 0
    this.points.forEach((point) => {
      this.avgDeviation += (point[2] - this.avgRent)**2;
    });
    
    this.avgDeviation /= this.points.length;
    this.avgDeviation = this.avgDeviation**0.5;
  }

  calculate_avg_difference(){
    if(this.points.length === 0) {
      this.avgDiff = "?";
      return;
    }
    this.avgDiff = 0
    this.points.forEach((point) => {
      this.avgDiff += Math.abs(point[2] - this.avgRent);
    });

    this.avgDiff /= this.points.length;
  }

  split(axis, axis_pos) {
    const [x0, y0, x1, y1] = this.rect;
    let [rectA, rectB] = [undefined, undefined];
    if (axis === 0) {
      rectA = [x0, y0, axis_pos, y1];
      rectB = [axis_pos, y0, x1, y1];
    }
    else {
      rectA = [x0, y0, x1, axis_pos];
      rectB = [x0, axis_pos, x1, y1];
    }
    const treeA = new TreeStructure(rectA, this.points, this.idx + "-L");
    const treeB = new TreeStructure(rectB, this.points, this.idx + "-R");
    colorPalette.push(this.color);
    this.children = [treeA, treeB];
    this.color = undefined;

    this.axis = axis;
    this.axis_pos = axis_pos;
  }

  delete_children() {
    this.children.forEach((child) => {
      if (child.children.length === 0) {
        colorPalette.push(child.color);
      }
    })
    this.color = colorPalette.pop();
    this.children = [];
    this.axis = undefined;
    this.axis_pos = undefined;
  }

  get_leaves() {
    if (this.children.length === 0) {
      return [this];
    }
    let leaves = []
    this.children.forEach((child) => {
      leaves = [...leaves, ...child.get_leaves()]
    })
    return leaves;
  }

  get_colors() {
    const leaves = this.get_leaves();
    let colors = {}
    leaves.forEach((leaf) => {
      colors[leaf.idx] = leaf.color;
    })
    return colors;
  }

  contains(x, y) {
    const [x0, y0, x1, y1] = this.rect;
    return (x >= x0) && (x <= x1) && (y >= y0) && (y <= y1);
  }

  find(x, y) {
    if (this.contains(x, y) && this.children.length === 0) {
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const findResult = child.find(x, y);
      if (findResult) {
        return findResult;
      }
    }
    return null;
  }

  find_idx(idx) {
    if (this.idx === idx) {
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const findResult = child.find_idx(idx);
      if (findResult) {
        return findResult;
      }
    }
    return null;
  }

  to_object() {
    const child_objs = this.children.map((child) => {
      return child.to_object();
    });
    return {
      rect: this.rect,
      children: child_objs
    }
  }

  get_line() {
    if(this.axis === undefined) {
      return undefined;
    }
    let lineStart = [this.rect[0], this.rect[1]];
    let lineEnd = [this.rect[2], this.rect[3]];

    lineStart[this.axis] = this.axis_pos;
    lineEnd[this.axis] = this.axis_pos;

    return [lineStart, lineEnd];
  }

  unhighlightAll() {
    this.isSelected = false;
    this.children.forEach((child) => {
      child.unhighlightAll();
    })
  }

  get_lines() {
    let lines = [];
    if(this.axis !== undefined) {
      lines = [this.get_line()];
    }
    this.children.forEach((child) => {
      lines = [...lines, ...child.get_lines()]
    });
    return lines;
  }

  get_path(x, y) {
    if(this.children.length === 0) {
      return [this];
    }
    for(let i = 0; i < this.children.length; i++) {
      if(this.children[i].contains(x, y)) {
        return [this, ...this.children[i].get_path(x, y)];
      }
    }
    return undefined;
  }

  removeTestPoints() {
    this.hasTestPoint = false;
    this.children.forEach((child) => {
      child.removeTestPoints();
    })
  }

  reset() {
    this.children.forEach((child) => {
      child.reset_children();
    });
    this.children = [];
    this.axis = undefined;
    this.axis_pos = undefined;
    if(this.color === undefined) {
      this.color = colorPalette.pop();
    }
  }

  reset_children() {
    this.children.forEach((child) => {
      child.reset_children();
    });
    this.children = [];
    if(this.color !== undefined) {
      colorPalette.push(this.color);
    }
  }

  getTestPointNode() {
    if(this.hasTestPoint) {
      return this;
    }
    for(let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      let childTestPointNode = child.getTestPointNode();
      if(childTestPointNode !== undefined) {
        return childTestPointNode
      }
    }
    return undefined;
  }
}

export function convertPythonTree(pythonTree, node) {
  if (pythonTree.children !== undefined && pythonTree.children.length > 0) {
    node.split(pythonTree.feature, pythonTree.threshold);
    node.children.forEach((child, childidx) => {
      convertPythonTree(pythonTree.children[childidx], child);
    })
  }
  return node;
}