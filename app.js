console.log(screen.width);
console.log(screen.height / 34.39);

for (let i = 0; i < 30; i++) {
  let d = document.createElement("div");
  d.setAttribute("id", `row-${i}`);
  document.getElementById("container").appendChild(d);
}

const arr = [];

for (let i = 0; i < 27; i++) {
  let row = document.getElementById(`row-${i}`);
  for (let j = 0; j < 63; j++) {
    let x = document.createElement("INPUT");
    x.style.width = "30px";
    x.style.height = "30px";
    x.setAttribute("type", "checkbox");
    row.appendChild(x);
    arr.push({ checkbox: x, position: [i, j] });
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const playGame = async () => {
  ///////////Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  let counterForDead = 0;
  const toCheck = [];
  const toUncheck = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].checkbox.checked == false) {
      let pos1 = arr[i].position[0];
      let pos2 = arr[i].position[1];

      arr.forEach((a) => {
        if (a.position[0] == pos1 - 1 && a.position[1] == pos2 - 1 && a.checkbox.checked == true) {
          counterForDead++;
        }
        if (a.position[0] == pos1 - 1 && a.position[1] == pos2 && a.checkbox.checked == true) {
          counterForDead++;
        }
        if (a.position[0] == pos1 - 1 && a.position[1] == pos2 + 1 && a.checkbox.checked == true) {
          counterForDead++;
        }
        if (a.position[0] == pos1 && a.position[1] == pos2 - 1 && a.checkbox.checked == true) {
          counterForDead++;
        }
        if (a.position[0] == pos1 && a.position[1] == pos2 + 1 && a.checkbox.checked == true) {
          counterForDead++;
        }
        if (a.position[0] == pos1 + 1 && a.position[1] == pos2 - 1 && a.checkbox.checked == true) {
          counterForDead++;
        }
        if (a.position[0] == pos1 + 1 && a.position[1] == pos2 && a.checkbox.checked == true) {
          counterForDead++;
        }
        if (a.position[0] == pos1 + 1 && a.position[1] == pos2 + 1 && a.checkbox.checked == true) {
          counterForDead++;
        }
      });

      if (counterForDead == 3) {
        toCheck.push(arr[i]);
        counterForDead = 0;
      }
      counterForDead = 0;
    } else {
      //Cells with less than 2 neighbours will die of underpopulation, cells with 4 or more neighbours will die of overpopulation
      //if cell is alive
      let counterForAlive = 0;
      let pos1 = arr[i].position[0];
      let pos2 = arr[i].position[1];

      arr.forEach((a) => {
        if (a.position[0] == pos1 - 1 && a.position[1] == pos2 - 1 && a.checkbox.checked == true) {
          counterForAlive++;
        }
        if (a.position[0] == pos1 - 1 && a.position[1] == pos2 && a.checkbox.checked == true) {
          counterForAlive++;
        }
        if (a.position[0] == pos1 - 1 && a.position[1] == pos2 + 1 && a.checkbox.checked == true) {
          counterForAlive++;
        }
        if (a.position[0] == pos1 && a.position[1] == pos2 - 1 && a.checkbox.checked == true) {
          counterForAlive++;
        }
        if (a.position[0] == pos1 && a.position[1] == pos2 + 1 && a.checkbox.checked == true) {
          counterForAlive++;
        }
        if (a.position[0] == pos1 + 1 && a.position[1] == pos2 - 1 && a.checkbox.checked == true) {
          counterForAlive++;
        }
        if (a.position[0] == pos1 + 1 && a.position[1] == pos2 && a.checkbox.checked == true) {
          counterForAlive++;
        }
        if (a.position[0] == pos1 + 1 && a.position[1] == pos2 + 1 && a.checkbox.checked == true) {
          counterForAlive++;
        }
      });

      if (counterForAlive < 2 || counterForAlive >= 4) {
        toUncheck.push(arr[i]);
        counterForAlive = 0;
      }
      counterForAlive = 0;
    }
  }
  for (let i = 0; i < toCheck.length; i++) {
    toCheck[i].checkbox.checked = true;
  }
  for (let i = 0; i < toUncheck.length; i++) {
    toUncheck[i].checkbox.checked = false;
  }

  ///////////
};
let myGame;
document.getElementById("run").addEventListener("click", async () => {
  myGame = setInterval(playGame, 500);
});

document.getElementById("pause").addEventListener("click", async () => {
  clearInterval(myGame);
});

document.getElementById("random").addEventListener("click", async () => {
  //arr.length 1701
  const nums = new Set();
  while (nums.size !== 501) {
    nums.add(Math.floor(Math.random() * 1700) + 1);
  }

  const randomArr = [...nums];
  for (let n of randomArr) {
    arr[n].checkbox.checked = true;
  }
});

//Save state
document.getElementById("save").addEventListener("click", async () => {
  clearInterval(myGame);
  let saveName = prompt("Please enter a name for your save!");

  boxToSave = "";
  arr.forEach((item, idx) => {
    if (item.checkbox.checked) {
      boxToSave += `${idx},`;
    }
  });

  if (saveName != null) {
    localStorage.setItem(saveName, boxToSave);
  } else {
    localStorage.setItem("randomSave", boxToSave);
  }
});

//Load state
document.getElementById("load").addEventListener("click", async () => {
  const savedStates = [];
  let loadGameBoxes = [];
  for (let key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      savedStates.push(key);
    }
  }
  const loadName = prompt("Please enter the name of the saved session you want to load");
  if (savedStates.includes(loadName)) {
    loadGameBoxes = localStorage.getItem(loadName).split(",");
  } else {
    alert("You did not enter a correct name!");
  }
  loadGameBoxes.pop();
  for (let j = 0; j < arr.length; j++) {
    arr[j].checkbox.checked = false;
  }
  for (let i = 0; i < loadGameBoxes.length; i++) {
    arr[parseInt(loadGameBoxes[i])].checkbox.checked = true;
  }
});

//check available space
var localStorageSpace = function () {
  var data = "";

  console.log("Current local storage: ");

  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      data += window.localStorage[key];
      console.log(key + " = " + ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2) + " KB");
    }
  }

  console.log(
    data ? "\n" + "Total space used: " + ((data.length * 16) / (8 * 1024)).toFixed(2) + " KB" : "Empty (0 KB)"
  );
  console.log(
    data ? "Approx. space remaining: " + (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) + " KB" : "5 MB"
  );
};

localStorageSpace();
