// attendre le chargement du DOM
document.addEventListener('DOMContentLoaded', () => { 
    // selection des éléments HTML
    const inputLabel = document.getElementById('inputLabel'); // pour le champ du libellé
    const inputAmount = document.getElementById('inputAmount'); // pour le champ du montant
    const inputType = document.getElementById('inputType'); // pour le menu déroulant de type (revenu ou dépense)
    const addButton = document.getElementById('addButton'); // pour le bouton Ajouter
    const budgetTable = document.getElementById('budgetTable').getElementsByTagName('tbody')[0]; // pour le tableau des budgets (tbody)
    const balanceAmount = document.getElementById('balanceAmount'); // pour affichert le solde

    //initialisation du solde a 0
    let balance = 0;

    // Ajouter un libellé avec revenu ou dépense
    addButton.addEventListener('click', () => {

        // Récupération et validation des montants
        const label = inputLabel.value.trim(); // récupère la valeur du champ libellé et enlève les espaces inutiles
        const amount = parseFloat(inputAmount.value.trim()); // convertit la valeur du champ montant en nombre
        const type = inputType.value; // récupère la valeur du menu déroulant (revenu ou dépense)
        
        if (label && !isNaN(amount)) { // vérifie que le libellé n'est pas vide et que le montant est valide
            const row = budgetTable.insertRow(); // Ajout de nouvelles lignes au tableau.
            const cellLabel = row.insertCell(0); // Ajout de la céllule pour le libéllé
            const cellRevenue = row.insertCell(1); // Ajout de la céllule pour le revenue
            const cellExpense = row.insertCell(2);// Ajout de la céllule pour la dépense
            // Mise à jour du tableau et du solde
            cellLabel.textContent = label;
            // Si le type est Revenu le montant est ajouté à la cellule de revenu et le solde est augmenté de ce montant
            if (type === 'revenue') { 
                cellRevenue.textContent = `${amount} €`;
                cellExpense.textContent = '';
                balance += amount;
            // Si le type n'est pas Revenu le montant est ajouté à la cellule de dépense et le solde est débité de ce montant
            } else {
                cellRevenue.textContent = '';
                cellExpense.textContent = `${amount} €`; 
                balance -= amount;
            }
            
            balanceAmount.textContent = balance.toFixed(2); // Affichage du sold avec deux décimales 
            inputLabel.value = ''; // reset la saisie pour Label
            inputAmount.value = ''; // reset la saisie pour Montant
        }
    });
});
