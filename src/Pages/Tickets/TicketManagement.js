import React, { useEffect, useState } from "react";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { Grid } from "react-loader-spinner";
import Table from "../../UI/CommonTable/Table";
import './TicketManagement.css';

const TicketManagement = ({ setActiveTab, setExpand }) => {
    setExpand("ticketManagement");
    setActiveTab("ticketManagement");

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [responseMessage, setResponseMessage] = useState("");
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        const response = await fetch('http://localhost:5000/api/admin/tickets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setTickets(data);
            setLoading(false);
        } else {
            alert('Failed to fetch tickets.');
            setLoading(false);
        }
    };

    const handleResponse = async () => {
        if (!selectedTicketId) return;

        const response = await fetch(`http://localhost:5000/api/admin/tickets/${selectedTicketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                status: 'resolved',
                message: responseMessage,
                adminId: '6710b472040a91b7248ee3d5',
            }),
        });

        if (response.ok) {
            alert('Response sent successfully!');
            fetchTickets(); 
            setResponseMessage('');
            setSelectedTicketId(null);
        } else {
            alert('Failed to send response.');
        }
    };

    const columns = [
        { header: "Subject", accessor: "subject" },
        { header: "User", accessor: "user.username" },
        { header: "Status", accessor: "status" },
        { header: "Action", accessor: "action" },
    ];

    const data = tickets.map((ticket) => ({
        subject: ticket?.subject,
        user: ticket?.user ? ticket.user.username : "Unknown User",
        status: ticket?.status,
        action: (
            <button onClick={() => {
                setSelectedTicketId(ticket._id);
                console.log(`Selected Ticket ID: ${ticket._id}`);
            }}>Respond</button>
        ),
    }));

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
                    <Grid
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        visible={true}
                    />
                </div>
            )}
            <TopHeader className="fixed" head="Ticket Management" />
            <div className="ml-80 relative bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders w-[70vw]" style={{ marginTop: "120px" }}>
                {tickets.length === 0 ? (
                    <div>No tickets available.</div>
                ) : (
                    <Table columns={columns} data={data} />
                )}
            </div>

            {selectedTicketId && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Respond to Ticket</h2>
                        <textarea
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            placeholder="Enter your response..."
                            required
                        />
                        <div className='buttonMiddleWrapper'>
                            <button onClick={handleResponse}>Send Response</button>
                            <button onClick={() => {
                                setSelectedTicketId(null);
                                setResponseMessage('');
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketManagement;
