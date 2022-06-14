class Track
{
    constructor(title, artist, image, path)
    {
        this.title = title;
        this.artist = artist;
        this.image = image;
        this.path = path;
    }
}

let tracks = [
    new Track('Silent Partner', 'Blue Skies', '1.jpg', 'Blue_Skies.mp3'),
    new Track('Media Right Productions', 'Cartoon Hoedown', '2.jpg', 'Cartoon_Hoedown.mp3'),
    new Track('Jingle Punks', 'Earthy Crust', '3.jpg', 'Earthy_Crust.mp3'),
    new Track('Silent Partner', 'Hold On a Minute', '4.jpg', 'Hold_On_a_Minute.mp3'),
    new Track('City of Prague Philharmonic', 'John Dunbar Theme', '5.jpg', 'JohnDunbarTheme.mp3'),
    new Track('Silent Partner', 'Stay With You', '6.jpg', 'Stay_With_You.mp3'),
    new Track('Beethoven', 'Symphony No 5 by Beethoven', '7.jpg', 'Symphony_No_5_by_Beethoven.mp3')
]

export default tracks;