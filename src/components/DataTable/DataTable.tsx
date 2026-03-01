import React, { useState, useMemo } from 'react';
import './styles.scss';

// Generate some dummy data
interface User {
    id: number;
    name: string;
    age: number;
    occupation: string;
}

const generateData = (count: number): User[] => {
    const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const occupations = ['Software Engineer', 'Data Scientist', 'Designer', 'Product Manager', 'Teacher', 'Nurse', 'Doctor', 'Lawyer', 'Accountant', 'Salesperson'];

    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        age: Math.floor(Math.random() * 50) + 20, // Age between 20 and 69
        occupation: occupations[Math.floor(Math.random() * occupations.length)],
    }));
};

const DUMMY_USERS = generateData(53); // 53 items to show an uneven last page

export default function DataTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = Math.ceil(DUMMY_USERS.length / itemsPerPage);

    // Calculate the current items to display based on pagination state
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return DUMMY_USERS.slice(startIndex, endIndex);
    }, [currentPage, itemsPerPage]);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePageSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = Number(e.target.value);
        setItemsPerPage(newItemsPerPage);
        // Reset to first page whenever we change items per page
        // Alternative is recalculating the page to stay on roughly the same items
        setCurrentPage(1);
    };

    return (
        <div className="data-table-container">
            <h2>Users Data Table</h2>

            <div className="data-table-controls">
                <label>
                    Show
                    <select value={itemsPerPage} onChange={handlePageSelectChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    entries
                </label>
            </div>

            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Occupation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.occupation}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="no-data">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination-footer">
                <div className="pagination-info">
                    Showing {currentItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                    {Math.min(currentPage * itemsPerPage, DUMMY_USERS.length)} of {DUMMY_USERS.length} entries
                </div>

                <div className="pagination-buttons">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={currentPage === 1 ? 'disabled' : ''}
                    >
                        Previous
                    </button>

                    <span className="page-indicator">
                        Page {currentPage} of {totalPages || 1}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
