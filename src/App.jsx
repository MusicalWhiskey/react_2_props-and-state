import { useState } from 'react'
import './App.css'

// Example 1
function Welcome (props) {
  console.log(props)
  return <h1 style={props.style} >Hello, {props.name}</h1>
}


// Example 2 - Child sending data to parent by using a passed function 
function Child(props) {

  // I want to access this prop "setter={setSomeVar}"?
  // How would I access? props._____
  //props.setter
  // the Child component called this function, which was able to change a variable that the App component (parent) controls
  props.setter(8)

  return <h1>{props.stuff}</h1>
}

/////======================================
// Example 3 - Prop Drilling 
function Title(props) {
  return <h1 style={{fontFamily: "monospace"}}>{props.title}</h1>
}

function Card(props) {
  return (
    <div style={{border: "2px solid white"}}>
      <Title title={props.title}/>
      <p style={{fontFamily: "monospace"}}>{props.content}</p>
    </div>
  )
}
/////======================================


// Example 4 - Destructing Props
function DestructuringExample ({ name, age = 18 }) {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{age}</h2>
    </div>
  )
}

// Example 5 - spreading props
function User ({name, age, website}) {

  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
      <h3>{website}</h3>
    </div>
  )
}

// Example 6 - props.children
function Container(props) {
  const style = {
    width: "90%",
    margin: "auto",
    border: "1px solid green"
  }

  return <div style={style}>
    {props.children}
  </div>
}


// Example 7 - Arrays w/ JSX
function Dogs (props) {
  // An array of dogs.
  const dogs = [
    { name: "Sparky", age: 5, id: 0 }, 
    { name: "Spot", age: 5, id: 1 },
    { name: "Ralph", age: 5, id: 2 },
    { name: "Fido", age: 5, id: 3},
    { name: "Ranger", age: 3, id: 4 }
  ]

  const dogJSX = dogs.map((dog) => {
    return <Dog dog={dog} />
  })

  return <ul>{dogJSX}</ul>
}

function Dog ({dog}){
  return(
    <li key={dog.id}>
        <h1>{dog.name}</h1>
        <h2>{dog.age}</h2>
    </li>
  )
}

// Example 8 - Iterating over Objects
const ObjectIteration = () => {
  const Person = {
    name: "Jane Doe",
    age: "35",
    email: "ceo@myfuturebusiness.com",
  }

  return Object.keys(Person).map((key, index) => {
    return (
      <h2>
            itr 0    Person["name"] = "Jane Doe"
            itr 1    Person["age"] = "35"
        {key}: {Person[key]}
      </h2>
    )
  })
}



function App(props) {
  let someVar = 0;
  const [count, setCount] = useState(0);

  const setSomeVar = (input) => {
    someVar = input
    console.log(someVar)
  }

  // Example 5
  const user = {
    name: "Samwise",
    age: 80,
    website: "samtheGardener.hobbit.com",
    skills: ["carries Frodo", "Gardening"],
    favFood: "Lembas bread"
  }

  return (
    <>
      {/* Example 1 */}
      <Welcome name="John Doe" anotherProp="whatever" style={{ color: "skyblue"}} />
      <h1 style={{ color: "skyblue"}}>Props Lesson</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => {
          someVar++
          console.log(someVar)
        }}>
          someVar is {someVar}
        </button>
      </div>
        
      {/* Example 2  */}
      <Child setter={setSomeVar}  stuff="whatever we want" />

      <hr />

      {/* The title prop is getting passed down through more than 2 components  */}
      {/* Example 3 */}
      <Card title="Prop Drilling" content="the inevitable tragedy" />

      {/* Example 4 */}
      <DestructuringExample name="Frodo Baggins" />

      {/* Example 5 */}
      <User {...user}  />

      <hr />

      <Container>
        <h2>Hello!</h2>
        <h3>We are the world! we are the children!</h3>
      </Container>

      <hr />

      <Dogs />
    </>
  )
}

export default App