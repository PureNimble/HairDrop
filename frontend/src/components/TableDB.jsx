import React from 'react';

function TableDB({ data }) {
    if (!data || data.length === 0) {
        return;
    }

    const headers = Object.keys(data[0]);

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-600"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                            {headers.map((key, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-4 py-2 border border-gray-300 text-gray-700"
                                >
                                    {String(row[key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableDB;
