// attendre le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // sélection des éléments HTML
    const inputLabel = document.getElementById('inputLabel'); // pour le champ du libellé
    const inputAmount = document.getElementById('inputAmount'); // pour le champ du montant
    const inputType = document.getElementById('inputType'); // pour le menu déroulant de type (revenu ou dépense)
    const addButton = document.getElementById('addButton'); // pour le bouton Ajouter
    const budgetTable = document.getElementById('budgetTable').getElementsByTagName('tbody')[0]; // pour le tableau des budgets (tbody)
    const balanceAmount = document.getElementById('balanceAmount'); // pour afficher le solde
    const totalRevenue = document.getElementById('totalRevenue'); // pour afficher le total des revenus
    const totalExpense = document.getElementById('totalExpense'); // pour afficher le total des dépenses

    // initialisation des variables pour les totaux et le solde
    let balance = 0;
    let revenueSum = 0;
    let expenseSum = 0;

    // Fonction pour mettre à jour la couleur du solde
    function updateBalanceColor() {
        console.log(`Balance: ${balance}`); // Debugging
        if (balance > 0) {
            balanceAmount.style.color = '#00b336';
        } else if (balance < 0) {
            balanceAmount.style.color = '#b30000';
        } else {
            balanceAmount.style.color = 'black';
        }
    }

    // Ajouter un libellé avec revenu ou dépense
    addButton.addEventListener('click', () => {
        // Récupération et validation des montants
        const label = inputLabel.value.trim(); // récupère la valeur du champ libellé et enlève les espaces inutiles
        const amount = parseFloat(inputAmount.value.trim()); // convertit la valeur du champ montant en nombre
        const type = inputType.value; // récupère la valeur du menu déroulant (revenu ou dépense)
        
        if (label && !isNaN(amount)) { // vérifie que le libellé n'est pas vide et que le montant est valide
            const row = budgetTable.insertRow(); // Ajout de nouvelles lignes au tableau.
            const cellLabel = row.insertCell(0); // Ajout de la cellule pour le libellé
            const cellRevenue = row.insertCell(1); // Ajout de la cellule pour le revenu
            const cellExpense = row.insertCell(2); // Ajout de la cellule pour la dépense
            const cellAction = row.insertCell(3); // Ajout de la cellule pour l'action (bouton de suppression)
            
            // Mise à jour du tableau et du solde
            cellLabel.textContent = label;
            // Si le type est Revenu, le montant est ajouté à la cellule de revenu et le solde est augmenté de ce montant
            if (type === 'revenue') {
                cellRevenue.textContent = `${amount} €`;
                cellExpense.textContent = '';
                balance += amount;
                revenueSum += amount; // Ajout au total des revenus
            // Si le type n'est pas Revenu, le montant est ajouté à la cellule de dépense et le solde est débité de ce montant
            } else {
                cellRevenue.textContent = '';
                cellExpense.textContent = `${amount} €`;
                balance -= amount;
                expenseSum += amount; // Ajout au total des dépenses
            }

            // Création du bouton de suppression
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.className = 'deleteButton';
            cellAction.appendChild(deleteButton);

            // Ajout de l'événement de suppression au bouton
            deleteButton.addEventListener('click', () => {
                if (type === 'revenue') {
                    balance -= amount;
                    revenueSum -= amount;
                } else {
                    balance += amount;
                    expenseSum -= amount;
                }
                // Mise à jour des affichages après suppression
                balanceAmount.textContent = balance.toFixed(2);
                totalRevenue.textContent = `${revenueSum.toFixed(2)} €`;
                totalExpense.textContent = `${expenseSum.toFixed(2)} €`;

                updateBalanceColor(); // Mise à jour de la couleur du solde

                row.remove(); // Suppression de la ligne du tableau
            });

            balanceAmount.textContent = balance.toFixed(2); // Affichage du solde avec deux décimales
            totalRevenue.textContent = `${revenueSum.toFixed(2)} €`; // Affichage du total des revenus
            totalExpense.textContent = `${expenseSum.toFixed(2)} €`; // Affichage du total des dépenses

            updateBalanceColor(); // Mise à jour de la couleur du solde

            inputLabel.value = ''; // reset la saisie pour Label
            inputAmount.value = ''; // reset la saisie pour Montant
        }
    });
});
