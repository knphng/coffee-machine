pragma solidity ^0.4.23;

/**
* @title CoffeeMachine
*/
contract MachineCafe {

    /**
    * @dev Prix d'un café
    */
    uint256 public prix = 2 finney;


    /**
    * @dev Déclaration de l'évènement de vente de café
    */
    event CafeVendu(uint cafeId, address acheteur);

    /**
    * @dev Déclaration de la structure de donnée "café"
    */
    struct Cafe {
        uint cafeId;
    }

    /**
    * @dev Un tableau contenant tous les cafés
    */
    Cafe[] cafes;

    /**
    * @dev Un tableau qui contient un mapping des id de café vers des addresses Ethereum (les acheteurs)
    * Permet d'associer les cafés vendus avec les acheteurs
    */
    mapping (uint => address) ventesDeCafe;

    /**
    * @dev Fonction publique d'achat de café
    * Appelable depuis l'extérieur du contrat, par exemple une application web avec web3.js
    */
    function acheterCafe() public payable returns (uint) {

        require(msg.value >= prix);

        // instancier un nouveau café
        Cafe memory c = Cafe(cafeId);

        // ajouter le café au tableau des cafés
        // récupérer l'id du prochain café
        uint cafeId = cafes.push(c) - 1;

        // mapper l'addresse de l'acheteur sur l'id du café
        ventesDeCafe[cafeId] = msg.sender;
        // msg.sender est une variable magique toujours accessible
        // msg.sender est l'addresse ethereum qui a fait l'appel déclenchant l'exécution du code

        // émettre l'évènement "café vendu"
        emit CafeVendu(cafeId, msg.sender);

        // retourner l'id du café vendu
        return cafeId;

    }

    /**
    *@title ownerOf
    * @dev Récupère le propriétaire d'un café
    * Implémente en partie l'interface ERC721
    */
    function ownerOf(uint256 _tokenId) public view returns (address) {
        address owner = ventesDeCafe[_tokenId];
        require(owner != address(0));
        return owner;
    }

    /**
    *@title totalVendu
    * @dev Retourne le nombre total de cafés vendus
    */
    function totalVendu() public view returns (uint) {
        return cafes.length;
    }

}