import { useState } from "react";
import { dogsData } from "./data";
import DogDetails from "./DogDetails";
import { v1 as generateUniqueID } from "uuid"; // v1 is an aliace AKA nickname.. call it generateUniqueI instead of v1
console.log(dogsData); //array of 4

function App() {
  //! 1. create dog state and initial state set to then value of the array (dogsData)
  const [dogs, setDogs] = useState(dogsData);

  //? 2. Create an unordered list and make a list of dogs inside of the main
  //
  //? 3. Add a new dog ---------
  function addDog() {
    const rover = {
      id: generateUniqueID(),
      name: "Rover",
      present: false,
      grade: "100",
      notes: "The goodest new dog",
    };
    // make a copy of the dogs array using destructuring.... spread
    setDogs([rover, ...dogs]);
  }
  //?-------
  //*----- Remove a dog W/ ID
  // parameter dogId. eveytime we fire function it excpects the dogId.
  function removeDog(dogID) {
    console.log(dogID);
    // use the filter method to remove any dogs that have a matching id
    const filteredDogArray = dogs.filter((dog) => dog.id !== dogID);
    // set the dogs array to the new array that will not have the removed dog
    setDogs(filteredDogArray);
  }
  //*-----
  //!---- update attendance with dogId to target that specific dog
  //copy the origina dogs using spread
  //Find method to find the one to be updated
  // Access the dog's present property and update the value
  // By using ! it will toggle the value of present
  function updateDogAttendance(dogID) {
    const dogsArr = [...dogs];
    const index = dogsArr.findIndex((dog) => dogID === dog.id);
    dogsArr[index].present = !dogsArr[index].present;

    //Update the state
    setDogs(dogsArr);
  }
  //? 4.Create a button and confirm that the button's event listener/handler works:
  return (
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
        <h2>{new Date().toDateString()}</h2>
      </header>
      <aside>
        <button onClick={addDog}>Add a new dog</button>
      </aside>
      <main>
        <ul>
          {/* // inside of the ul, we map over the dogs array and get the name. we gave the li a unique identifyer.  */}
          {dogs.map((dog) => {
            return (
              <li key={dog.id}>
                <span
                  onClick={() => updateDogAttendance(dog.id)}
                  //if dog is present, text deco none.. else not present line through
                  style={
                    dog.present
                      ? { textDecoration: "none" }
                      : { textDecoration: "line-through" }
                  }
                >
                  {dog.name}{" "}
                </span>
                <button onClick={() => removeDog(dog.id)}>Remove dog</button>{" "}
                {/* dog represent each entire dog. passing it using props by the name of {dog} */}
                <DogDetails dog={dog} />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
