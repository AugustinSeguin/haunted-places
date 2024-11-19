<?php
// Configuration de la base de données
$host = 'localhost';
$db = 'haunted_places';
$user = 'root';
$pass = 'password';
$charset = 'utf8mb4';

// DSN (Data Source Name)
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Options PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // Connexion à la base de données
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

// Fonction pour récupérer et afficher les données de la table ghost
function fetchAndDisplayGhosts($pdo) {
    $stmt = $pdo->query('SELECT * FROM ghost');
    $ghosts = $stmt->fetchAll();

    if ($ghosts) {
        echo '<table border="1">';
        echo '<tr><th>ID</th><th>Lieudit</th><th>Adresse</th><th>Like</th><th>Fear</th><th>Created At</th><th>Updated At</th></tr>';
        foreach ($ghosts as $ghost) {
            echo '<tr>';
            echo '<td>' . htmlspecialchars($ghost['id']) . '</td>';
            echo '<td>' . htmlspecialchars($ghost['lieudit']) . '</td>';
            echo '<td>' . htmlspecialchars($ghost['adresse']) . '</td>';
            echo '<td>' . htmlspecialchars($ghost['like']) . '</td>';
            echo '<td>' . htmlspecialchars($ghost['fear']) . '</td>';
            echo '<td>' . htmlspecialchars($ghost['created_at']) . '</td>';
            echo '<td>' . htmlspecialchars($ghost['updated_at']) . '</td>';
            echo '</tr>';
        }
        echo '</table>';
    } else {
        echo 'No ghosts found.';
    }
}

// Appel de la fonction pour afficher les données
fetchAndDisplayGhosts($pdo);
?>