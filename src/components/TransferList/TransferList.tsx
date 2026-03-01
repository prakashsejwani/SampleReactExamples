import React, { useState } from 'react';
import './styles.scss';

interface Item {
    id: number;
    label: string;
}

const DEFAULT_ITEMS: Item[] = [
    { id: 1, label: 'React.js' },
    { id: 2, label: 'TypeScript' },
    { id: 3, label: 'Next.js' },
    { id: 4, label: 'Vite.js' },
    { id: 5, label: 'Framer Motion' },
    { id: 6, label: 'Redux Toolkit' },
    { id: 7, label: 'Tailwind CSS' },
    { id: 8, label: 'Vitest' },
    { id: 9, label: 'Playwright' },
    { id: 10, label: 'Prisma' }
];

const TransferList: React.FC = () => {
    const [leftItems, setLeftItems] = useState<Item[]>(DEFAULT_ITEMS);
    const [rightItems, setRightItems] = useState<Item[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [leftSearch, setLeftSearch] = useState('');
    const [rightSearch, setRightSearch] = useState('');

    const handleToggle = (id: number) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const moveSelectedToRight = () => {
        const itemsToMove = leftItems.filter((item) => selectedIds.has(item.id));
        const itemsToKeep = leftItems.filter((item) => !selectedIds.has(item.id));
        setRightItems((prev) => [...prev, ...itemsToMove].sort((a, b) => a.id - b.id));
        setLeftItems(itemsToKeep);
        setSelectedIds(new Set());
    };

    const moveSelectedToLeft = () => {
        const itemsToMove = rightItems.filter((item) => selectedIds.has(item.id));
        const itemsToKeep = rightItems.filter((item) => !selectedIds.has(item.id));
        setLeftItems((prev) => [...prev, ...itemsToMove].sort((a, b) => a.id - b.id));
        setRightItems(itemsToKeep);
        setSelectedIds(new Set());
    };

    const moveAllToRight = () => {
        setRightItems((prev) => [...prev, ...leftItems].sort((a, b) => a.id - b.id));
        setLeftItems([]);
        setSelectedIds(new Set());
    };

    const moveAllToLeft = () => {
        setLeftItems((prev) => [...prev, ...rightItems].sort((a, b) => a.id - b.id));
        setRightItems([]);
        setSelectedIds(new Set());
    };

    const filteredLeft = leftItems.filter(item =>
        item.label.toLowerCase().includes(leftSearch.toLowerCase())
    );

    const filteredRight = rightItems.filter(item =>
        item.label.toLowerCase().includes(rightSearch.toLowerCase())
    );

    const leftSelectedCount = leftItems.filter(i => selectedIds.has(i.id)).length;
    const rightSelectedCount = rightItems.filter(i => selectedIds.has(i.id)).length;

    return (
        <div className="transfer-list-container">
            <div className="list-pane">
                <div className="pane-header">
                    <div className="header-top">
                        <h3>Available</h3>
                        <span className="count">{leftItems.length} items</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={leftSearch}
                        onChange={(e) => setLeftSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="pane-content">
                    {filteredLeft.length > 0 ? (
                        filteredLeft.map((item) => (
                            <div
                                key={item.id}
                                className={`item ${selectedIds.has(item.id) ? 'selected' : ''}`}
                                onClick={() => handleToggle(item.id)}
                            >
                                <div className="checkbox-ring">
                                    {selectedIds.has(item.id) && <div className="dot" />}
                                </div>
                                <span>{item.label}</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No items found</div>
                    )}
                </div>
            </div>

            <div className="controls">
                <button
                    className="control-btn"
                    onClick={moveAllToRight}
                    disabled={leftItems.length === 0}
                    title="Move All Right"
                >
                    <span>»</span>
                </button>
                <button
                    className="control-btn"
                    onClick={moveSelectedToRight}
                    disabled={leftSelectedCount === 0}
                    title="Move Selected Right"
                >
                    <span>›</span>
                </button>
                <button
                    className="control-btn"
                    onClick={moveSelectedToLeft}
                    disabled={rightSelectedCount === 0}
                    title="Move Selected Left"
                >
                    <span>‹</span>
                </button>
                <button
                    className="control-btn"
                    onClick={moveAllToLeft}
                    disabled={rightItems.length === 0}
                    title="Move All Left"
                >
                    <span>«</span>
                </button>
            </div>

            <div className="list-pane">
                <div className="pane-header">
                    <div className="header-top">
                        <h3>Selected</h3>
                        <span className="count">{rightItems.length} items</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search selection..."
                        value={rightSearch}
                        onChange={(e) => setRightSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="pane-content">
                    {filteredRight.length > 0 ? (
                        filteredRight.map((item) => (
                            <div
                                key={item.id}
                                className={`item ${selectedIds.has(item.id) ? 'selected' : ''}`}
                                onClick={() => handleToggle(item.id)}
                            >
                                <div className="checkbox-ring">
                                    {selectedIds.has(item.id) && <div className="dot" />}
                                </div>
                                <span>{item.label}</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No selections matched</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransferList;
