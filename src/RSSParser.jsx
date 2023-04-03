import React, { useEffect, useState } from 'react';
import './Card.css';

const RSSParser = ({ url }) => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();
        const parser = new DOMParser();
        const parsedData = parser.parseFromString(data, 'application/xml');
        setFeed(parsedData);
      } catch (error) {
        console.error('Error fetching and parsing RSS feed:', error);
      }
    };

    fetchRSSFeed();
  }, [url]);

  const fetchGameDetails = async (gameTitle) => {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${encodeURIComponent(gameTitle)}&key=1c441ec9ae43472aace2afa96ca1281a`
    );
    const data = await response.json();
    return data.results[0];
  };

  const GameCard = ({ item }) => {
    const [gameDetails, setGameDetails] = useState(null);
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;

    // Extract the game URL from the description
    const gameUrlRegex = /\?url=([^&]+)/g;
    const gameUrlMatches = description.match(gameUrlRegex) || [];
    const gameUrl = gameUrlMatches.find(
      (url) =>
        url.includes('gog.com') ||
        url.includes('store.steampowered.com') ||
        url.includes('epicgames.com/store') ||
        url.includes('uplay.ubisoft.com')
    ) || '';
    const cleanGameUrl = decodeURIComponent(gameUrl.split('=')[1]).split('"')[0];

    useEffect(() => {
      fetchGameDetails(title).then((details) => setGameDetails(details));
    }, [title]);

    if (!gameDetails) {
      return <div>Loading...</div>;
    }

    const coverUrl = gameDetails.background_image;
    const gameTitle = gameDetails.name;
    const gameDescription = gameDetails.description_raw;

    return (
      <div className="game-card">
        <div className="game-card-header">
          <h3 className="card-title">{gameTitle}</h3>
        </div>
        <a href={cleanGameUrl}>
          <img src={coverUrl} alt={title} />
        </a>
        <div className="game-card-body">
          <p className="game-title">{title}</p>
          <a href={cleanGameUrl} className="claim-btn">
            Claim this game
          </a>
        </div>
      </div>
    );
  };



  if (!feed) {
    return <div>Loading...</div>;
  }

  const items = feed.querySelectorAll('item');

  return (
    <div>
      <h1 className='free-games-title'>Free Games by <a href='htts://edyrodriguez.dev'>Edy</a></h1>
      <div className="card-container">
      {Array.from(items).map((entry, index) => (
        <GameCard key={index} item={entry} />
      ))}
    </div>
    </div>

  );
};

export default RSSParser;
