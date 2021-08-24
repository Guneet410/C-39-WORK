class Game {
  constructor() {

    this.resetTitle = createElement("h2")
    this.resetbtn = createButton("")  

    this.leaderBoardtitle = createElement("h2") 
    this.l1 = createElement("h2") 
    this.l2 = createElement("h2") 
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html ("Reset Game")
    this.resetTitle.position(width / 2 ,100)
    this.resetTitle.class("resetText")
   

    this.resetbtn.position(width/2 , 150)
    this.resetbtn.class("resetBtn")

    this.leaderBoardtitle.html("LeaderBoard")
    this.leaderBoardtitle.class("resetText")
    this.leaderBoardtitle.position(width/3,100)


    //this.l1.html()
    this.l1.position(width/3,150)
    this.l2.position(width/3,180)
    this.l1.class("leaderText")
    this.l2.class("leaderText")
  }


  handleResetBtn(){
   this.resetbtn.mousePressed(()=> {
    database.ref("/").set({
      playerCount : 0,
      gameState : 0,
      players : {}
    })
    window.location.reload();
   }
   )
   
  }








showLeaderBoard (){
  var l1,l2;

  var players = Object.values(allPlayers);

  if((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1){
    l1 = players[0].rank + players[0].name + player[0].score;
    l2 = players[1].rank + players[1].name + player[1].score;
  }
  if(players[1].rank === 1){
    l1 = players[1].rank + players[1].name + player[1].score;
    l2 = players[0].rank + players[0].name + player[0].score;
  }

  this.l1.html(l1)
  this.l2.html(l2)

}





  play() {
    this.handleElements();
    this.handleResetBtn();
    Player.getPlayersInfo();


    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showLeaderBoard();
      
      //index of the array
      var index = 0;
      
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          // Changing camera position in y direction
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }
    

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
