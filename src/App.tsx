import { useState } from 'react'
import emailjs from 'emailjs-com'
import './App.css'

type CheckBoxesState = {
  [key: string]: boolean;
};

function App() {
  const [checkBoxes, setCheckBoxes] = useState<CheckBoxesState>({
    hongdae: false,
    onesie: false,
    skating: false,
  })

  const [flowerName, setFlowerName] = useState('')

  const [pageNumber, setPageNumber] = useState(1)

  const [creditCard, setCreditCard] = useState(false)

  const submit = () => {
    const activities = [];
    if (checkBoxes.hongdae) activities.push("Go to Hongdae");
    if (checkBoxes.onesie) activities.push("Wear Onesies");
    if (checkBoxes.skating) activities.push("Ice Skate");
  
    const activitiesText = activities.length
      ? `Robin wants to: ${activities.join(", ")}.`
      : "Robin has not selected any activities.";
  
    const flowerText = flowerName
      ? `Her favorite flower is ${flowerName}.`
      : "She hasn't told us her favorite flower yet.";
  
    const creditCardText = "Make sure to bring your credit cards!";
  
    const emailBody = `${activitiesText} ${flowerText} ${creditCardText}`;
  
    const templateParams = {
      checkBoxes: JSON.stringify(checkBoxes),
      flowerName,
      creditCard: creditCard ? 'Yes' : 'No',
      emailBody,
    };
  
    emailjs.send('bob', 'template_269a3wr', templateParams, '56dEkuCRpSH6KQ_0L')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email.', error);
      });
  };
  

  return (
    <div className='container'>
      {pageNumber === 1 && (
        <>
          <h1 className='title'>Congratulations Robin!🥳👏</h1>
          <h2 className='subheading'>You have been invited to go on a date with me🙂‍↕️</h2>
          <button className='button' onClick={() => setPageNumber(2)}>Next</button> 
        </>
      )}
      {pageNumber === 2 && (
        <>
          <h1 className='subheading'>Select what you'd like to do:</h1>
          <div className='checkboxes'>
            <label>
              <input
                type='checkbox'
                checked={checkBoxes.hongdae}
                onChange={(e) => setCheckBoxes({ ...checkBoxes, hongdae: e.target.checked })}
              />
              Walk around Hongdae
            </label>
            <label>
              <input
                type='checkbox'
                checked={checkBoxes.onesie}
                onChange={(e) => setCheckBoxes({ ...checkBoxes, onesie: e.target.checked })}
              />
              Buy and Wear Onesies
            </label>
            <label>
              <input
                type='checkbox'
                checked={checkBoxes.skating}
                onChange={(e) => setCheckBoxes({ ...checkBoxes, skating: e.target.checked })}
              />
              Go Ice Skating
            </label>
          </div>
          <p className='text'>(You can select up to 3)</p>
          <div className='button-group'>
            <button className='button' onClick={() => setPageNumber(1)}>Back</button>
            <button className='button' onClick={() => setPageNumber(3)}>Next</button>
          </div>
        </>
      )}
      {pageNumber === 3 && (
        <>
          <h1 className='subheading'>What is your favorite flower?</h1>
          <input
            type='text'
            value={flowerName}
            onChange={(e) => setFlowerName(e.target.value)}
            className='input'
            placeholder='Enter here...🌸'
          />
          <p className='text'>(Don't question it hehe)</p>
          <div className='button-group'>
            <button className='button' onClick={() => setPageNumber(2)}>Back</button>
            <button className='button' onClick={() => setPageNumber(4)}>Next</button>
          </div>
        </>
      )}
      {pageNumber === 4 && (
        <>
          <h1 className='subheading'>Final Confirmation</h1>
          <label>
            <input
              type='checkbox'
              checked={creditCard}
              onChange={(e) => setCreditCard(e.target.checked)}
            />
            By checking this box, I agree to leave all of my credit cards at home for the duration of the date
          </label>
          <div className='button-group'>
            <button className='button' onClick={() => setPageNumber(3)}>Back</button>
            <button className='button' onClick={() => { { submit(); setPageNumber(5); } }} disabled={!creditCard}>Submit</button>
          </div>
        </>
      )}
      {pageNumber === 5 && (
        <>
          <h1 className='subheading'>Thank you!</h1>
        </>
      )}
    </div>
  )
}

export default App