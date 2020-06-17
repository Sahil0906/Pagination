// import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import axios from 'axios';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import * as ReactBootstrap from 'react-bootstrap';
// // import { DATA } from './data'
// // import ReactTable from 'react-table';


// const App = () => {
//   const [players, setPlayers] = useState([]);
//   const [loading,setLoading] = useState(false);

//   const getPlayerData = async () => {
//     try{
//       const data = await axios.get(
//         "https://nba-players.herokuapp.com/players-stats"
//       );
//       console.log(data)
//       setPlayers(data.data)
//       setLoading(true)
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const columns = [
//     { dataField: "name", text:"Player name" },
//     { dataField: "points_per_game", text:"Points Per game" },
//     { dataField: "team_name", text:<span className='fa-check-square-o'></span> }
//   ]

//   useEffect(() => {
//     getPlayerData()
//   },[])

//   return (
//     <div className="App">
//       {loading ? (
//         <BootstrapTable 
//         keyField="name"
//         data={players}
//         columns={columns}
//         pagination={paginationFactory()}
      
//       />
//       ) : (
//         <ReactBootstrap.Spinner animation='border'/>
//       )}
      
//     </div>
//   );
// }

// // const App = () => {

// //   const data = DATA;
// //   console.log(data);

// //   return(
// //     <div className="App">

// //     </div>
// //   )
// // }

// export default App;


import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';
import { DATA } from './data';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const data = DATA;

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  //     setPosts(res.data);
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
