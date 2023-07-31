import React, { useState, useEffect, useRef } from 'react';

const Problem2 = () => {
  // Mock data for contacts with different countries
  const mockContacts = [
    { id: 1, phone: '123-456-7890', country: { name: 'Country 1' } },
    { id: 2, phone: '987-654-3210', country: { name: 'Country 2' } },
    { id: 3, phone: '111-222-3333', country: { name: 'Country 3' } },
    { id: 4, phone: '555-666-7777', country: { name: 'US' } }, // US contact
    { id: 5, phone: '444-333-2222', country: { name: 'Country 4' } },
    // Add more mock contacts with different countries as needed
    // ...
  ];

  const [contacts, setContacts] = useState([]);
  const [country, setCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const modalContentRef = useRef();

  useEffect(() => {
    // Function to fetch data from the API based on country, search term, and page number
    const fetchContacts = async () => {
      setLoading(true);
      try {
        // Uncomment the below code and replace with API call for actual implementation
        // const response = await fetch(
        //   `https://contact.mediusware.com/api/country-contacts/${country}/?search=${searchTerm}&page=${page}`
        // );
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.json();
        // const fetchedContacts = data.results;
        // setContacts((prevContacts) => [...prevContacts, ...fetchedContacts]);
        // setLoading(false);

        // For mock data, set contacts directly
        let filteredContacts = [];
        if (!country && !onlyEven) {
          // Show all contacts
          filteredContacts = mockContacts;
        } else if (country === 'US' && !onlyEven) {
          // Show US contacts
          filteredContacts = mockContacts.filter((contact) => contact.country.name === 'US');
        } else if (!country && onlyEven) {
          // Show only even contacts
          filteredContacts = mockContacts.filter((contact) => contact.id % 2 === 0);
        } else if (country === 'US' && onlyEven) {
          // Show US contacts and only even contacts
          filteredContacts = mockContacts.filter(
            (contact) => contact.country.name === 'US' && contact.id % 2 === 0
          );
        }

        setContacts(filteredContacts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    // Fetch contacts when component mounts and whenever country, search term, or page changes
    fetchContacts();
  }, [country, searchTerm, page, onlyEven]);

  useEffect(() => {
    // Reset the page to 1 whenever the search term changes
    setPage(1);

    // Function to handle the search input with debounce
    const handleSearchContacts = async () => {
      setLoading(true);

      // Debounce time (in milliseconds)
      const debounceTime = 500;

      // Wait for the specified debounce time before fetching contacts
      await new Promise((resolve) => setTimeout(resolve, debounceTime));

      // Uncomment the below code and replace with API call for actual implementation
      // fetchContacts();
      // For mock data, filter contacts based on the search term
      const filteredContacts = mockContacts.filter((contact) =>
        contact.phone.includes(searchTerm) || contact.country.name.includes(searchTerm)
      );
      setContacts(filteredContacts);
      setLoading(false);
    };

    handleSearchContacts();
  }, [searchTerm]);

  // Function to handle infinite scroll
  const handleScroll = () => {
    const modalContent = modalContentRef.current;
    if (
      modalContent.scrollHeight - modalContent.scrollTop === modalContent.clientHeight &&
      !loading
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleOpenModalA = () => {
    setCountry('');
    setShowModalA(true);
    setShowModalB(false);
    setSelectedContact(null);
    // Update the URL to /modalA when opening Modal A
    window.history.pushState({}, '', '/modalA');
  };

  const handleOpenModalB = () => {
    setCountry('US');
    setShowModalA(false);
    setShowModalB(true);
    setSelectedContact(null);
    // Update the URL to /modalB when opening Modal B
    window.history.pushState({}, '', '/modalB');
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  const handleCloseModals = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
    setSelectedContact(null);
    // Update the URL to the homepage when closing any modal
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleOpenModalA}
            style={{ backgroundColor: '#46139f' }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleOpenModalB}
            style={{ backgroundColor: '#ff7f50' }}
          >
            US Contacts
          </button>
        </div>

        {/* Rest of the content */}
        <div className="mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-4" onScroll={handleScroll} ref={modalContentRef} style={{ height: '200px', overflowY: 'auto' }}>
          <h5>Contacts:</h5>
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id} onClick={() => handleContactClick(contact)}>
                {contact.phone} - {contact.country.name}
              </li>
            ))}
          </ul>
          {loading && <p>Loading...</p>}
        </div>

        {/* Modal A */}
        {showModalA && (
          <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
              <span className="close" onClick={handleCloseModals}>
                &times;
              </span>
              <h2>Modal A</h2>
              {/* Add content for Modal A here */}
              <button
                className="btn btn-primary"
                onClick={handleOpenModalA}
                style={{ backgroundColor: '#46139f' }}
              >
                Switch to All Contacts
              </button>
              <button
                className="btn btn-warning mx-2"
                onClick={handleOpenModalB}
                style={{ backgroundColor: '#ff7f50' }}
              >
                Switch to US Contacts
              </button>
              <button className="btn btn-secondary" onClick={handleCloseModals}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal B */}
        {showModalB && (
          <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
              <span className="close" onClick={handleCloseModals}>
                &times;
              </span>
              <h2>Modal B</h2>
              {/* Add content for Modal B here */}
              <button
                className="btn btn-primary"
                onClick={handleOpenModalA}
                style={{ backgroundColor: '#46139f' }}
              >
                Switch to All Contacts
              </button>
              <button
                className="btn btn-warning mx-2"
                onClick={handleOpenModalB}
                style={{ backgroundColor: '#ff7f50' }}
              >
                Switch to US Contacts
              </button>
              <button className="btn btn-secondary" onClick={handleCloseModals}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal C */}
        {showModalC && selectedContact && (
          <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
              <span className="close" onClick={() => setShowModalC(false)}>
                &times;
              </span>
              <h2>Modal C</h2>
              {/* Display selected contact details */}
              <div>
                <p>Name: {selectedContact.name}</p>
                <p>Email: {selectedContact.email}</p>
                {/* Add more contact details as needed */}
              </div>
            </div>
          </div>
        )}

        {/* Checkbox */}
        <div className="d-flex justify-content-end mt-3">
          <label className="form-check-label" htmlFor="onlyEvenCheckbox">
            Only Even Contacts:
          </label>
          <input
            className="form-check-input ms-2"
            type="checkbox"
            id="onlyEvenCheckbox"
            checked={onlyEven}
            onChange={(e) => setOnlyEven(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default Problem2;
