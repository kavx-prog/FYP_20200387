import React, { useState } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import "../assets/styles/emergencykit.css";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Header from '../components/Header';
function EmergencyKit() {
  // General template for the emergency kit
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;
  const generalKitItems = [
    'First aid kit',
    'Flashlight',
    'Batteries',
    'Blankets',
    'Whistle',
    'Duct tape',
    'Multi-tool',
  ];

  // State to store user responses
  const [familySize, setFamilySize] = useState(1); // Default is 1 person
  const [hasKids, setHasKids] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [disasterType, setDisasterType] = useState('flood'); // Default is 'flood'
  const [familyAgeRange, setFamilyAgeRange] = useState('adults'); // Default is 'adults'
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergyType, setAllergyType] = useState('none');

  // State to store user-customized kit items
  const [customKitItems, setCustomKitItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Function to add an item to the custom kit
  const addItemToCustomKit = (item) => {
    setCustomKitItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove an item from the custom kit
  const removeItemFromCustomKit = (item) => {
    setCustomKitItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((i) => i !== item)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }
  };

  // Function to generate the customized kit based on user responses and disaster type
  const generateCustomKit = () => {
    const customizedKit = [...generalKitItems]; // Start with the general template

    // Add items based on user responses
    if (familySize >= 1) {
      customizedKit.push(`Water bottles (${familySize} gallon per day per person)`);
      customizedKit.push(`Non-perishable food (${familySize} per person)`);
    }

    if (hasKids) {
      customizedKit.push('Baby formula');
      customizedKit.push('Diapers');
      customizedKit.push('Children\'s medications and comfort items');
    }

    if (hasAllergies) {
      if (allergyType === 'food') {
        customizedKit.push('EpiPen (for food allergy)');
      } else if(allergyType === 'pollen') {
        customizedKit.push('Antihistamines (for pollen allergy)');
      }else if (allergyType === 'insect'){
        customizedKit.push('Epinephrine  (for insect sting allergy)');
      }
      // Add more allergies and corresponding medications as needed
    }

    if (hasPets) {
      customizedKit.push('Pet food');
      customizedKit.push('Leash and pet carrier');
    }

    // Customize based on disaster type
    if (disasterType === 'landslide') {
      customizedKit.push('Sturdy shoes');
      customizedKit.push('Helmet');
      customizedKit.push('Dried meats');
      customizedKit.push('Energy gel packs');
    } else if (disasterType === 'flood') {
      customizedKit.push('Life jacket');
      customizedKit.push('Rain gear');
      customizedKit.push('Dried fruits');
      customizedKit.push('High-energy cereals');
    }

    if (familyAgeRange === 'children' || familyAgeRange === 'mixed') {
      customizedKit.push('Children\'s entertainment items');
    }

    setCustomKitItems(customizedKit);
  };

  return (
    <div>
    <Header></Header>
    <br></br>
    <div className="emergency-kit">

      <Container style={{ backgroundColor: "white", alignSelf: "center" }}>
      <br></br>
      <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
          {t("emergency kit")}
          <img
            src={require("../assets/images/emergencykit2.jpg")}
            height={"80px"}
            style={{ float: "right" }}
            alt="Megaphone"
          />
        </h1>
        

     
        <Container style={{ backgroundColor: "#F8FFF7", padding: "20px" }}>
          <div>
            <button
              onClick={() => setDisasterType('flood')}
              className={disasterType === 'flood' ?              'active' : ''
            }>
              {t("flood")}
            </button>
            <button
              onClick={() => setDisasterType('landslide')}
              className={disasterType === 'landslide' ? 'active' : ''}
            >
             {t("landslide")}
            </button>
            <button
              onClick={() => setDisasterType('strongwind')}
              className={disasterType === 'strongwind' ? 'active' : ''}
            >
              {t("strongwind")}
            </button>
            <button
              onClick={() => setDisasterType('thunderstorm')}
              className={disasterType === 'thunderstorm' ? 'active' : ''}
            >
              {t("thunderstrom")}
            </button>
          </div>

          
          <br />
          <label className='form-label'>
          {t("family size")}
            <input
              type="number"
              value={familySize}
              onChange={(e) => setFamilySize(Number(e.target.value))}
              className="form-control form-control-lg"
            />
          </label>

          <br />
          <br />

          
          <label className='form-label'>
            {t("age range of family")}
            <select
              value={familyAgeRange}
              onChange={(e) => setFamilyAgeRange(e.target.value)}
              className="form-select form-select-lg"
            >
              <option value="adults">Adults</option>
              <option value="children">Children</option>
              <option value="mixed">Mixed (Adults and Children)</option>
            </select>
          </label>

          <br />
          <br />

         
          <input
            type="checkbox"
            checked={hasKids}
            onChange={() => setHasKids(!hasKids)}
          />
          {"          "}
          <label>
            {t("do you have kids")}?
          </label>

          <br />
          <br />

          <input
            type="checkbox"
            checked={hasPets}
            onChange={() => setHasPets(!hasPets)}
          />
          {"          "}
          <label>
            {t("do you have pets")}?
          </label>

          <br />
          <br />

         
          <input
            type="checkbox"
            checked={hasAllergies}
            onChange={() => setHasAllergies(!hasAllergies)}
          />
          {"          "}
          <label>
            {t("do you or your family have allergies")}?
          </label>

          <br />
          <br />

         
          {hasAllergies && (
            <div>
              <label className="form-label">
                Select Allergy Type:
                <select
                  value={allergyType}
                  onChange={(e) => setAllergyType(e.target.value)}
                  className="form-select form-select-lg"
                >
                  <option value="none">None</option>
                  <option value="food">Food Allergy</option>
                  <option value="pollen">Pollen Allergy</option>
                  <option value="insect">Insect Sting Allergy</option>
                  {/* Add more allergy types as needed */}
                </select>
              </label>
            </div>)
          }

        <center>
          <button type="button" className="btn btn-success" onClick={generateCustomKit}>
           {t("generate custom kit")}
          </button>
</center>
         <br></br>
          <h2 style={{"textAlign":"center"}}>{t("your customized kit")}</h2>
          <ul>
            {customKitItems.map((item) => (
              <li key={item}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => toggleItemSelection(item)}
                />
                {''} {item}
              </li>
            ))}
          </ul>
        </Container>
      </Container>
    </div></div>
  );
}

export default EmergencyKit;

