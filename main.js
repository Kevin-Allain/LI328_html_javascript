function main(){

	environnement=new Object();
	environnement.users=new Array();
	environnement.actif=undefined;
	// BUG DANS LA CREATION DU USER
	var utilisateur= new User(7,'Yoda','Yoda','Yoda',true);
	environnement.actif=utilisateur;
	
	getDivConnexion();

	getListe_posts();
}

function User(idUser,login,prenom,nom,contact){
	this.idUser=idUser;
	this.login=login;
	this.contact=contact;
	this.prenom=prenom;
	this.nom=nom;

	if(contact==undefined){
		this.contact=false;
	}

	if(environnement==undefined){
		environnement={}; 
	}

	if(environnement.users==undefined){
		environnement.users=[];
	}
	
	// BUG ICI POUR LA CREATION DE L'USER
	//environnements.users[id]=this;
}

User.prototype.modifStatus=function(){
	if(this.contact){
		this.contact=false;
	} else {
		this.contact=true;
	}
}

function Commentaire(idCommentaire,auteur,texte,date,score){
	this.idCommentaire=idCommentaire;
	this.auteur=auteur;
	this.texte=texte;
	this.date=date;
	this.score=score;
	
	/*
	this.getHtml(){
		return ("Id : "+this.id+"<br>Auteur : "+this.auteur+"<br>Texte : "+this.texte+"<br>Date : "+this.date+"<br>Score : "+this.score+"<br>"
				+ "<img src=\"plus.jpg\" class=\"plus_img\"> <img src=\"minus.png\" class=\"minus_img\"> <br> <br>");
	};
	*/

}
//Il faut rajouter un test verifiant si le id de la personne connectée est different du id de la personne qui a posté.
//Si c'est le cas alors on ajoute un bouton qui permet de rajouter en ami cette personne.
Commentaire.prototype.getHtml = function() {
	return ("Id : "+this.idCommentaire+" <br>Auteur : "+this.auteur+" <br>Texte : "+this.texte+" <br>Date : "+this.date+" <br>Score : "+this.score+" <br>"
			+ "<img src=\"plus.jpg\" class=\"plus_img\"> <img src=\"minus.png\" class=\"minus_img\"> <br> <br>");
}



function envoiCommentaires(){
	var u1=new User(1,'Joe','Joe','Dalton',false);
	var u2=new User(2,'Jack','Jack','Dalton',true);

	var c1=new Commentaire(45,u1.idUser,'Je hais Lucky Luke', new Date(), 4);
	var c2=new Commentaire(46,u2,'Lucky Luke tire vraiment trop vite', new Date(), 4);
	var c3=new Commentaire(47,u1,'Satan� Lucky Luke', new Date(), 4);

	//alert("creation users + commentaires ok"); OK
	
	alert("infos sur u1 et c1:<br/> "+u1.idUser+ u1.login+u1.prenom+u1.prenom +" <br/> " +c1.idCommentaire+" "+c1.texte+" "+c1.auteur+" "+c1.date+" "+c1.score);
	
	//var r=new rechercheCommentaire([c1,c2,c3],"",false,u1,new Date());
	var r = c1.prototype.getHtml();
	alert (r);
	 r= r + c2.prototype.getHtml();
	 alert(r);
	 r = r+ c3.prototype.getHtml();
	alert(r);
	alert ('on met dans r les commentaires');
	//return JSON.stringify(r);
	return r;
}

//RECHERCHE COMMENTAIRES NON DEFINI !
/*
RechercheCommentaire.revival=function(key,value){
	if(key.length==0){
		if (value.error==undefined){
			return new RechercheCommentaires(value.resultat,value.recherche,value.contact,value.auteur,value.date);
		} else {
			return value;
		}
	}else if(isNumber(key)&&value.auteur instanceof User){
		return new Commentaire(value.id,value.auteur,value.texte,value.date,value.score);
	} else if (key='auteur'){
		return new User(value.id, value.login,value.contact);
	} else if (key='date'){
		return new Date(value);
	} else {
		return value;
	}
}
*/

// si user n'est pas null, on change l'affichage de la page main en consequence

function getDivConnexion(){
	var user=environnement.actif;
	if (user!==undefined){
		$("#liens_connexion_deconnexion").html("<br/><br/><br/><span id=\"log\" >"+user.login+" ("+user.prenom+" "+user.nom+") "+ "</span> <br/>  ");
			//+	"<input type=\"submit\" value=\"disconnect\" />" );
		$("#disconnect").css("color:blue");
		$("#disconnect").css("visivility:visible");
		$("#disconnect").css("position:absolute");
		//$("#disconnect").html("<input type=\"submit\" value=\"disconnect2\" />" );
		
	}
	else {
		$("#liens_connexion_deconnexion").html("<br/><br/><a href=\"connexion.html\" >Login</a> <br> <br> <a href=\"enregistrement.html\"> Enregistrement </a> "); 
		$("#disconnect").css("visivility:hidden");
	}
}

function getListe_posts(){
	var user=environnement.actif;
	if (user!=undefined){
		// BUG DANS ENVOICOMMENTAIRES, QUI DOIT NOUS SERVIR A METTRE DES EXEMPLES
		var coms = envoiCommentaires();
		$("#liste_posts").html(coms +"<br/> On a user qui est defini");
	} else {
		var r ="<br/><br/>Posts publics : <br/><br/><br/>   Coca Cola : Are we the only ones who feel like Ikea is shi****** with us ? " +
				"<img src=\"plus.jpg\" class=\"plus_img\"> <img src=\"minus.png\" class=\"minus_img\"> <br> <br> ";
		$("#liste_posts").html(r);
	}
}
