myFetch.init({
  address: "https://api.spotify.com/v1/",
  key: "Bearer BQC_NrN80EQHc3p4hZqD5uVSuW87ShAFX3vPlypqHBn4zfeaZJMdvHnkcU9x9cfj4zPWAUOSMUYbDLD9cVXkd315aqmtbnj9ddT64fIrZylt-pxtikYUhOTsEG2baXdhGCFwCPfl"
});

myFetch.get("browse/featured-playlists").then(result => console.log(result));