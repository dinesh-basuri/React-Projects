import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: 0,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 0,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  let [addfriend, setAddFriend] = useState(false);
  let [friend, setFriend] = useState(initialFriends);
  let [selectedFriend, setSelectedFriend] = useState(null);

  function closeOpen() {
    setAddFriend(!addfriend);
  }
  function handleAddFriend(friend) {
    setFriend((friends) => [...friends, friend]);
    setAddFriend(false);
  }
  function handleSelectFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((curr) => (curr === friend ? null : friend));
    setAddFriend(false);
  }
  function handleSplitBill(value) {
    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          friend={friend}
          handleSelectFriend={handleSelectFriend}
        />

        {addfriend && <FormAddFriend handleAddFriend={handleAddFriend} />}

        <Button onClick={closeOpen}>
          {addfriend ? "close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FriendsList({ friend, handleSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend
          selectedFriend={selectedFriend}
          friend={friend}
          key={friend.id}
          handleSelectFriend={handleSelectFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, handleSelectFriend, selectedFriend }) {
  let isSelected = selectedFriend === friend;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button onClick={() => handleSelectFriend(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
    </li>
  );
}
function FormAddFriend({ handleAddFriend }) {
  let [name, setName] = useState("");
  let [image, setImage] = useState("https://i.pravatar.cc/48");

  let id = crypto.randomUUID();

  function handlesubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    let newFriend = { name, id, image, balance: 0 };
    handleAddFriend(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={handlesubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill({ selectedFriend, handleSplitBill }) {
  let [bill, setBill] = useState("");
  let [expense, setExpense] = useState("");
  let [whoIsPaying, setWhoIsPaying] = useState("user");
  let friendExpence = bill ? bill - expense : "";

  function handle(e) {
    e.preventDefault();

    if (!bill || !expense) return;

    handleSplitBill(whoIsPaying === "user" ? friendExpence : -expense);
  }
  return (
    <form className="form-split-bill" onSubmit={handle}>
      <h2>Split bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🕴️ Your expense</label>
      <input
        type="text"
        value={expense}
        onChange={(e) =>
          setExpense(
            Number(e.target.value) > bill ? expense : Number(e.target.value)
          )
        }
      ></input>

      <label>🧑‍🤝‍🧑 {selectedFriend.name} expense</label>
      <input type="text" disabled value={friendExpence}></input>

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option className="user">You</option>
        <option className="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
