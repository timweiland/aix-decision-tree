export default function ColumnContainer({ children }) {
    return <div className="flex h-screen w-screen relative" data-theme="light" >
        {children}
    </div>
}