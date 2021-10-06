for (let i = 0; i < 50; i++) {
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


// arr[64].checkbox.checked = true;

// arr[74].checkbox.checked = true;
// console.log(arr[11+63])
// arr[74].checkbox.checked = true;
//1,10 =  arr[i]
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
/*
(async () => {
  let counter = 0;
  const toCheck = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].checkbox.checked == false) {
      // console.log(arr[i]);
      let pos1 = arr[i].position[0];
      let pos2 = arr[i].position[1];
      try {
        if (arr[i - 62].checkbox.checked == true) counter++;
        if (arr[i - 63].checkbox.checked == true) counter++;
        if (arr[i - 64].checkbox.checked == true) counter++;
        if (arr[i - 1].checkbox.checked == true) counter++;
        if (arr[i + 1].checkbox.checked == true) counter++;
        if (arr[i + 64].checkbox.checked == true) counter++;
        if (arr[i + 63].checkbox.checked == true) counter++;
        if (arr[i + 62].checkbox.checked == true) counter++;
      } catch (error) {
        console.log(error);
      }

      await sleep(1);
      if (counter == 3) {
        toCheck.push(arr[i])
        console.log(arr[i], "current array")
        console.log(arr[i+1], "checkboxed array")
        counter = 0
      }
      counter = 0
    }
  }

  console.log("gimme somthing", toCheck)
  for (let i = 0; i < toCheck.length; i++) {
    toCheck[i].checkbox.checked = true
    
  }
})();*/

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
      // console.log(pos1, pos2);

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
    } else { //Cells with less than 2 neighbours will die of underpopulation, cells with 4 or more neighbours will die of overpopulation
      //if cell is alive
      let counterForAlive = 0;
      let pos1 = arr[i].position[0];
      let pos2 = arr[i].position[1];
      //[0,0][0,1][0,2]
      //[1,0][1,1][1,2]
      //[2,0][2,1][2,2]
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
  while(nums.size !== 501) {
    nums.add(Math.floor(Math.random() * 1700) + 1);
  }

  const randomArr = [...nums]
  for(let n of randomArr){
    arr[n].checkbox.checked = true
  }
});



// (async () => {
//   setInterval(playGame, 1000);
// })();
/*
//  make 34.7 dynamic
// for (let i = 0; i < Math.floor(window.innerWidth/ width)+1; i++) {
//   for (let j = 0; j < Math.floor(window.innerHeight/ width)+1; j++) {
//     let x = document.createElement("INPUT");
//     x.style.width = "30px";
//     x.style.height = "30px";
//     x.setAttribute("type", "checkbox");
//     document.body.appendChild(x);
//     arr.push({ checkbox: x, position: [i, j] });
//   }
// }

console.log(arr[5].position[1]);
arr[300].checkbox.checked = true;
console.log(arr[300]);

document.addEventListener("scroll", () => {
  //   console.log("asd", arr[300].position);
  //   let p1 = arr[300].position[0]
  //   let p2 = arr[300].position[1]

  //   for (let k = 0; k < arr.length; k++) {

  //     if (arr[k].position[0] == p1-1 && arr[k].position[1] == p2-1) {
  //         console.log(arr[k])
  //         arr[k].checkbox.checked = true;
  //     }
  //   }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].checkbox.checked == true) {
      console.log(arr[i].position);
    }
  }

  // for (let i = 0; i < arr.length; i++) {
  //    if(arr[i].position[0] == 0 && arr[i].position[1] == 19){
  //        console.log(arr[i].position)
  //         arr[i].checkbox.checked =true
  //    }
  // }
  //   for (let i = 0; i < Math.floor(height / 34.7); i++) {
  //     for (let j = 0; j < document.body.clientWidth / 30; j++) {
  //       for (let k = 0; k < arr.length; k++) {
  //         if (arr[i].position[0] == 0 && arr[i].position[1] == 19) {
  //           console.log(arr[i].position);
  //           arr[i].checkbox.checked = true;
  //         }
  //       }
  //     }
  //   }
  console.log(arr.length);
});
*/
