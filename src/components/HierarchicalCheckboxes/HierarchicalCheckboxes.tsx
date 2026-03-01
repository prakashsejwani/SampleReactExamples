import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';

export type CheckedState = boolean | 'indeterminate';

export interface CheckboxItem {
    id: number;
    name: string;
    checked?: CheckedState;
    children?: CheckboxItem[];
}

const fileData: CheckboxItem[] = [
    {
        id: 1,
        name: 'Electronics',
        children: [
            {
                id: 2,
                name: 'Mobile phones',
                children: [
                    {
                        id: 3,
                        name: 'iPhone',
                    },
                    {
                        id: 4,
                        name: 'Android',
                    },
                ],
            },
            {
                id: 5,
                name: 'Laptops',
                children: [
                    {
                        id: 6,
                        name: 'MacBook',
                    },
                    {
                        id: 7,
                        name: 'Surface Pro',
                    },
                ],
            },
        ],
    },
    {
        id: 8,
        name: 'Books',
        children: [
            {
                id: 9,
                name: 'Fiction',
            },
            {
                id: 10,
                name: 'Non-fiction',
            },
        ],
    },
    {
        id: 11,
        name: 'Toys',
    },
];

// Helper to determine parent checkout state based on children
function calculateParentState(children: CheckboxItem[]): CheckedState {
    if (!children || children.length === 0) return false;
    let allTrue = true;
    let allFalse = true;

    for (const child of children) {
        if (child.checked === true) allFalse = false;
        else if (child.checked === false) allTrue = false;
        else if (child.checked === 'indeterminate') {
            allTrue = false;
            allFalse = false;
        }
    }

    if (allTrue) return true;
    if (allFalse) return false;
    return 'indeterminate';
}

// Deeply updates checked state of node and all its descendants
function updateDescendants(item: CheckboxItem, checked: boolean): CheckboxItem {
    if (!item.children || item.children.length === 0) {
        return { ...item, checked };
    }
    return {
        ...item,
        checked,
        children: item.children.map(child => updateDescendants(child, checked)),
    };
}

// Finds the target by id, toggles it and its descendants, then recalibrates ancestors
function toggleNodeAndAncestors(
    items: CheckboxItem[],
    targetId: number,
    targetChecked: boolean
): { items: CheckboxItem[]; changed: boolean } {
    let changed = false;

    const newItems = items.map(item => {
        let newItem = { ...item };

        if (newItem.id === targetId) {
            newItem = updateDescendants(newItem, targetChecked);
            changed = true;
        } else if (newItem.children && newItem.children.length > 0) {
            const childResult = toggleNodeAndAncestors(newItem.children, targetId, targetChecked);
            if (childResult.changed) {
                newItem.children = childResult.items;
                // recalculate parent state
                newItem.checked = calculateParentState(newItem.children);
                changed = true;
            }
        }
        return newItem;
    });

    return { items: newItems, changed };
}

// Initializer to make sure all missing 'checked' states are calculated properly
function initializeTree(items: CheckboxItem[]): CheckboxItem[] {
    return items.map(item => {
        const newItem = { ...item };
        if (newItem.children && newItem.children.length > 0) {
            newItem.children = initializeTree(newItem.children);
            newItem.checked = calculateParentState(newItem.children);
        } else {
            newItem.checked = newItem.checked ?? false;
        }
        return newItem;
    });
}

// CheckboxNode renders an individual checkbox and its children
const CheckboxNode: React.FC<{
    item: CheckboxItem;
    onToggle: (id: number, checked: boolean) => void;
}> = ({ item, onToggle }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = item.checked === 'indeterminate';
        }
    }, [item.checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(item.id, e.target.checked);
    };

    return (
        <div className="checkbox-node">
            <label className="checkbox-node__label">
                <input
                    type="checkbox"
                    ref={inputRef}
                    checked={item.checked === true}
                    onChange={handleChange}
                />
                <span className="checkbox-node__name">{item.name}</span>
            </label>
            {item.children && item.children.length > 0 && (
                <div className="checkbox-node__children">
                    {item.children.map(child => (
                        <CheckboxNode key={child.id} item={child} onToggle={onToggle} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function HierarchicalCheckboxes() {
    const [data, setData] = useState<CheckboxItem[]>(() => initializeTree(fileData));

    const handleToggle = (id: number, checked: boolean) => {
        const { items, changed } = toggleNodeAndAncestors(data, id, checked);
        if (changed) {
            setData(items);
        }
    };

    return (
        <div className="hierarchical-checkboxes">
            <h2>Hierarchical Checkboxes</h2>
            <div className="hierarchical-checkboxes__container">
                {data.map(item => (
                    <CheckboxNode key={item.id} item={item} onToggle={handleToggle} />
                ))}
            </div>
        </div>
    );
}
