// Fetch movies from the API and display them dynamically
async function fetchMovies() {
    const loadingMessage = document.getElementById("loadingMessage");
    const movieCardsContainer = document.getElementById("movieCards");

    try {
        const response = await fetch("https://bookmyshow-clone-backend-xn9x.onrender.com/movie/get-movies");
        const movies = await response.json();

        // Clear loading message and show the movie container
        loadingMessage.style.display = "none";
        movieCardsContainer.style.display = "flex";

        // Check if the response is successful
        if (response.ok) {
            movies.forEach((movie) => {
                // Create a new card for each movie
                const card = document.createElement("div");
                card.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
                card.innerHTML = `
                    <div class="card movie-card" onclick="location.href='details.html?id=${movie._id}'" style="cursor: pointer;">
                        <img src="${movie.image}" alt="${movie.title}" class="card-img-top" style="height: 300px; object-fit: cover;">
                        <div class="card-body text-center">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.genre}</p>
                            <button class="btn btn-primary btn-booking">Book Now</button>
                        </div>
                    </div>
                `;
                // Append the card to the container
                movieCardsContainer.appendChild(card);
            });
        } else {
            loadingMessage.innerHTML = "Failed to load movies.";
        }
    } catch (error) {
        console.error(error);
        loadingMessage.innerHTML = "An error occurred while loading movies.";
    }
}

// Initialize fetching of movies when the page loads
document.addEventListener("DOMContentLoaded", fetchMovies);
