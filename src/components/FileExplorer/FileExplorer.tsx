import { useState } from "react";
import "./FileExplorer.scss";

interface FileObject {
    id: number;
    name: string;
    children?: FileObject[];
}

interface FileExplorerProps {
    data: FileObject[];
}

/**
 * Utility: sort directories first, then files, alphabetically
 */
function sortItems(items: FileObject[]) {
    return [...items].sort((a, b) => {
        const aIsDir = !!a.children;
        const bIsDir = !!b.children;

        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;

        return a.name.localeCompare(b.name);
    });
}

/**
 * Recursive tree node
 */
function TreeNode({
    item,
    level = 0,
}: {
    item: FileObject;
    level?: number;
}) {
    const isDirectory = !!item.children;
    const [isOpen, setIsOpen] = useState(false);

    // Instead of inline style for padding, we can use a CSS variable or just nesting in the container
    const paddingLeft = level * 20;

    if (!isDirectory) {
        // File (leaf node)
        return (
            <div className="tree-node" data-testid={`file-${item.id}`}>
                <div className="tree-item file" style={{ paddingLeft: paddingLeft + 20 }}>
                    <span className="icon">📄</span>
                    <span className="name">{item.name}</span>
                </div>
            </div>
        );
    }

    // Directory
    return (
        <div className="tree-node" data-testid={`dir-${item.id}`}>
            <div
                className="tree-item directory"
                style={{ paddingLeft }}
                onClick={() => setIsOpen((prev) => !prev)}
                role="button"
                aria-expanded={isOpen}
            >
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▶</span>
                <span className="icon">{isOpen ? "📂" : "📁"}</span>
                <span className="name">{item.name}</span>
            </div>

            {isOpen && (
                <div className="children-container">
                    {item.children && item.children.length > 0 ? (
                        sortItems(item.children).map((child) => (
                            <TreeNode
                                key={child.id}
                                item={child}
                                level={level + 1}
                            />
                        ))
                    ) : (
                        <div className="empty-msg" style={{ paddingLeft: paddingLeft + 40 }}>
                            (empty folder)
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function FileExplorer({ data }: FileExplorerProps) {
    if (!data || data.length === 0) {
        return <div className="file-explorer empty">No files found</div>;
    }

    return (
        <div className="file-explorer" data-testid="file-explorer">
            {sortItems(data).map((item) => (
                <TreeNode key={item.id} item={item} />
            ))}
        </div>
    );
}
