import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resource = ({ path, paths, render }) => {

  const initialState = {
    trans: [],
    loading: true,
    error: null,
  };

  const [state, setState] = useState(initialState);

  const getData = async () => {
    try {
      let urls = [];

      // Convert single path → array
      if (path) urls = [path];
      if (paths && Array.isArray(paths)) urls = paths;

      // Fetch all URLs in parallel
      const results = await Promise.all(urls.map(url => axios.get(url)));

      // Merge all API results
      const mergedData = results.flatMap(res => res.data);

      setState({
        trans: mergedData,
        loading: false,
        error: null,
      });

    } catch (error) {
      console.error("Error in getData", error.message);
      setState({
        trans: [],
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="pets-grid">{render(state)}</div>;
};

export default Resource;
