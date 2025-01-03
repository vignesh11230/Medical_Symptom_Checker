const diseaseData = [
    {
        name: 'Flu',
        description: 'A viral infection that attacks your respiratory system.',
        symptoms: ['Cough', 'Fever', 'Fatigue', 'Headache'],
        prevention: 'Vaccination, good hygiene, avoiding close contact with infected individuals.',
        treatment: 'Rest, hydration, over-the-counter medication.',
        riskFactors: 'Children, elderly, individuals with weakened immune systems.'
    },
    {
        name: 'Cold',
        description: 'A mild viral infection of the nose and throat.',
        symptoms: ['Cough', 'Runny nose', 'Sore throat'],
        prevention: 'Wash hands regularly, avoid close contact with infected individuals.',
        treatment: 'Rest, hydration, throat lozenges.',
        riskFactors: 'Children, individuals in cold weather.'
    },
    {
        name: 'COVID-19',
        description: 'A contagious disease caused by the coronavirus SARS-CoV-2.',
        symptoms: ['Cough', 'Fever', 'Fatigue', 'Headache', 'Sore throat'],
        prevention: 'Vaccination, wearing masks, social distancing.',
        treatment: 'Rest, isolation, seeking medical attention if necessary.',
        riskFactors: 'Elderly, individuals with pre-existing conditions.'
    },
    {
        name: 'Migraine',
        description: 'A neurological condition characterized by intense headaches.',
        symptoms: ['Headache', 'Fatigue', 'Nausea'],
        prevention: 'Identify and avoid triggers, manage stress.',
        treatment: 'Pain relief medications, rest in a dark room.',
        riskFactors: 'Women, family history, certain foods.'
    },
    {
        name: 'Gastroenteritis',
        description: 'Inflammation of the stomach and intestines, usually caused by viral infections.',
        symptoms: ['Nausea', 'Fatigue', 'Headache'],
        prevention: 'Wash hands, avoid contaminated food and water.',
        treatment: 'Hydration, over-the-counter anti-nausea medication.',
        riskFactors: 'Young children, elderly, individuals with weakened immune systems.'
    },
];

function checkSymptoms() {
    const selectedSymptoms = [];
    const checkboxes = document.querySelectorAll('#symptom-form input[type="checkbox"]:checked');

    // Check if at least one symptom is selected
    if (checkboxes.length === 0) {
        alert("Please select at least one symptom.");
        return;
    }

    // Gather selected symptoms
    checkboxes.forEach(checkbox => {
        selectedSymptoms.push(checkbox.value);
    });

    // Display selected symptoms
    const symptomsList = document.getElementById('selected-symptoms-list');
    symptomsList.innerHTML = '';
    selectedSymptoms.forEach(symptom => {
        const li = document.createElement('li');
        li.textContent = symptom;
        symptomsList.appendChild(li);
    });

    // Find and rank diseases based on symptom matches
    let diseasesWithMatches = diseaseData.map(disease => {
        const matchCount = selectedSymptoms.filter(symptom => disease.symptoms.includes(symptom)).length;
        const matchPercentage = (matchCount / disease.symptoms.length) * 100;

        return { ...disease, matchPercentage };
    });

    // Sort diseases by match percentage
    diseasesWithMatches = diseasesWithMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Display suggested diseases
    const diseaseList = document.getElementById('suggested-disease-list');
    diseaseList.innerHTML = ''; // Clear previous results

    if (diseasesWithMatches.length > 0) {
        diseasesWithMatches.forEach(disease => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${disease.name} (${disease.matchPercentage.toFixed(2)}%)</strong>: ${disease.description}
                <br><em>Prevention:</em> ${disease.prevention}
                <br><em>Treatment:</em> ${disease.treatment}
                <br><em>Risk Factors:</em> ${disease.riskFactors}
            `;
            diseaseList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No disease found based on the selected symptoms.';
        diseaseList.appendChild(li);
    }
}
