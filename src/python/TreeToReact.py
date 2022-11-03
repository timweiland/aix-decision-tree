import numpy as np


def export_for_react(model, map):
    '''
    Parameters
    ----------
    model : The model must be a trained decision tree from sklearn
    map : The map must be of <class 'numpy.ndarray'> e.g. after plt.imread()

    Returns
    -------
    A dictionary containing all the relevant information for react.
    Expalnation of some of the keys:
      Feature: 0 refers to the horizontal axis, feature: 1 to the vertical axis
      The threshold is given in % of the total image_width or heigth
    '''
    n_nodes = model.tree_.node_count
    children_left = model.tree_.children_left
    children_right = model.tree_.children_right
    feature = model.tree_.feature
    threshold = model.tree_.threshold
    value = model.tree_.value
    map_heigth = map.shape[0]
    map_width = map.shape[1]

    node_depth = np.zeros(shape=n_nodes, dtype=np.int64)
    is_leaves = np.zeros(shape=n_nodes, dtype=bool)
    stack = [(0, 0)]  # start with the root node id (0) and its depth (0)
    while len(stack) > 0:
        # `pop` ensures each node is only visited once
        node_id, depth = stack.pop()
        node_depth[node_id] = depth

        # If the left and right child of a node is not the same we have a split
        # node
        is_split_node = children_left[node_id] != children_right[node_id]
        # If a split node, append left and right children and depth to `stack`
        # so we can loop through them
        if is_split_node:
            stack.append((children_left[node_id], depth + 1))
            stack.append((children_right[node_id], depth + 1))
        else:
            is_leaves[node_id] = True

    def recurse(node_id):
        if is_leaves[node_id]:
            dict = {}
            dict["avgRent"] = round(value[node_id][0][0])
            dict["feature"] = -1
            dict["threshold"] = -1
        else:
            dict = {}
            dict["avgRent"] = round(value[node_id][0][0])
            dict["feature"] = int(feature[node_id])
            if dict["feature"] == 0:
                dict["threshold"] = round(threshold[node_id]/map_width*100)
            else:
                dict["threshold"] = round(threshold[node_id]/map_heigth*100)
            dict["children"] = [
                recurse(children_left[node_id]), recurse(children_right[node_id])]
        return dict
    return recurse(0)
