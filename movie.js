const url = new URL(location.href);
console.log("Full URL: " + url.href);

const movieId = url.searchParams.get("id");
console.log("Movie ID: " + movieId);

const movieTitle = url.searchParams.get("title");
console.log("Movie Title: " + movieTitle);

const APILINK = 'http://localhost:8000/api/v1/reviews/'

const main = document.getElementById('section')
const title = document.getElementById('movietitle')

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
    <div class="row">
        <div class="column">
            <div class="card">
                New Review
                <p><strong>Review: </strong><input type="text" id="new_review"></p>
                <p><strong>User: </strong><input type="text" id="new_user"></p>
                <p><button onclick="saveReview('new_review', 'new_user')">Add</button></p>
            </div>
        </div>
    </div>
`;

main.appendChild(div_new);

returnMovies(APILINK);
function returnMovies(url) {
    // FETCH
    fetch(url + "movie/" + movieId)
        // Because return is a JSON object, we need to convert it to a JSON object
        .then(res => res.json())
        .then(function(data) {
            console.log(data)

            //const div_card = document.createElement('div');
            //div_card.className = 'card';

            data.forEach(review => {

                // Create elements
                const div_card = document.createElement('div');
                
                div_card.innerHTML = `
                <div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                            <p><strong>Review: </strong>${review.review}</p>
                            <p><strong>User: </strong>${review.user}</p>
                            <p>
                                <a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a> 
                                <a href="#" onclick="deleteReview('${review._id}')">Trash</a>
                            </p>
                            
                        </div>
                    </div>
                </div>`;

                main.appendChild(div_card);
            });
        });
}


function editReview(id, review, user) {
    console.log(review)
    const element = document.getElementById(id);
    console.log(element)
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
        <p><strong>Review: </strong><input type="text" id="${reviewInputId}" value="${review}"></p>
        <p><strong>User: </strong><input type="text" id="${userInputId}" value="${user}"></p>
        <p>
            <a href="#" onclick="updateReview('${id}', '${reviewInputId}', '${userInputId}')">Save</a> 
            <a href="#" onclick="deleteReview('${id}')">Trash</a>
        </p>
    `;
}

function updateReview(id, reviewInputId, userInputId) {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    fetch(APILINK + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review: review, user: user })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // Reload page
        location.reload();
    });
}

function deleteReview(id) {
    fetch(APILINK + id, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // Reload page
        location.reload();
    });
}

function saveReview(reviewId, userId) {
    const review = document.getElementById(reviewId).value;
    const user = document.getElementById(userId).value;

    fetch(APILINK + "new", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId: movieId, review: review, user: user })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        // Reload page
        location.reload();
    });
}