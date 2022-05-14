import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';

function Home() {
  const [val, setVal] = useState([]);
  const [formData, setFormData] = useState({ inp: "" });

  const { inp } = formData;

  const handleInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(inp);

  const onClick = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos`,
        {
          params: {
            q: inp,
            numResults: 10, // by default taking 10 as no of results
          },
        }
      )
      .then((res) => setVal(res.data.results))
      .catch((err) => console.log(err.msg));
  };

  useEffect(() => {
    console.log({ val });
  }, [val]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="https://ik.imagekit.io/socialboat/sbcloud/res/htt-holidaying-travel-technologies/image/upload/Group_24_xq1djk/1648556882.png"
            alt=""
            width="30px"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="inp"
              value={inp}
              onChange={handleInput}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={onClick}
            >
              Search
            </button>
            <Avatar alt="Adarsh" src="" className="avatar" />
          </form>
        </div>
      </nav>

      <div className="container">
        {val.length > 0 ? (
          <div>
            {val.map((i) => {
              return (
                
                  <div className="card" key={i._id}>
                    <a href={i.video}>
                      <img
                        className="card-img-top"
                        src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/591c8a010428634b4a33375c/images/5ab4866b2c7d3a56d8873f4c/file-MrylO8jADD.png"
                        alt=""
                      />
                    </a>
                    <div className="card-body">
                      <h5 className="card-title">{i.heading}</h5>
                      <p className="card-text">
                        {i.tags.map((s) => {
                          return <div>{s}</div>;
                        })}
                      </p>
                    </div>
                  </div>
               
              );
            })}{" "}
          </div>
        ) : (
          <div>
            {" "}
            <h4>Please type to search!</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
