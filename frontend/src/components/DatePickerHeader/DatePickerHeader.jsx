import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; 
  const [selectedDates, setSelectedDates] = useState([today, today]); 
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleDateChange = (dates) => {
    if (dates.length === 1) {
      const selectedDate = dates[0];
      if (selectedDate) {
        setSelectedDates([selectedDate, selectedDate]);
      }
    } else if (dates.length === 2) {
      setSelectedDates(dates);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };


  const getApi = async (dates) => {
    const [startDate, endDate] = dates;
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    console.log("Start Date:", formattedStartDate);  
    console.log("End Date:", formattedEndDate); 

    
    // api
  };
  



  // const handleSubmit = (e) => {
  //   e.preventDefault(); 
  //   console.log(selectedDates);
  //   onSubmit(selectedDates);
  //   setShowSelectedDate(true);
  //   setPickerVisible(false);
  // };

  

  useEffect(() => {
    if (selectedDates[0] && selectedDates[1]) {
      // callApi(selectedDates);

      getApi(selectedDates);
      console.log(selectedDates[0], selectedDates[1])
    }
  }, [selectedDates]);

  return (
    <div>
      <p
        onClick={() => setPickerVisible(true)}
        className="date-visible"
        style={{
          cursor: 'pointer',
          color: '#fff',
          backgroundColor: '#F25288', 
          display: 'inline-block',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s, transform 0.3s',
          userSelect: 'none',
          width: '100%',
          textAlign: 'center'
        }}
      >
        {formattedDate} 
      </p>

      {isPickerVisible && (
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDates[0]}
            onChange={handleDateChange}
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            selectsRange
            inline
            calendarClassName="custom-calendar" 
          />
        </div>
      )}

      {selectedDates.length > 0 && (
        <div className="selected-dates">
          <h3>Selected Dates:</h3>
          {selectedDates.length === 1 || selectedDates[0] === selectedDates[1] ? (
            <p>
               {selectedDates[0]?.toLocaleDateString()} 
            </p>
          ) : (
            <p>
              From: {selectedDates[0]?.toLocaleDateString()} To: {selectedDates[1]?.toLocaleDateString()}
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default DatePickerComponent;
