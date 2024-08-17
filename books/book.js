document.addEventListener('DOMContentLoaded', async function () {
    const styleSearch = document.querySelector(".search");
    const Input = document.querySelector(".input");
    const Click = document.querySelector(".bookbutton");
    const books = document.querySelector(".books");

    Click.addEventListener("click", async function () {
        styleSearch.classList.add("stylepop");
        const enter = Input.value;
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(enter)}`;

        try {
            const res = await fetch(apiUrl);
            const data = await res.json();

            if (data.items && data.items.length > 0) {
                const bookSlice = data.items.slice(0, 10);
                books.innerHTML = '';
                bookSlice.forEach(book => {
                    const bookName = book.volumeInfo;
                    const bookImg = bookName.imageLinks ? bookName.imageLinks.thumbnail : '';
                    const bookLink = bookName.infoLink ? bookName.infoLink : '#';

                    books.innerHTML += `
                    <div class="book">
                        ${bookImg ? `<img src="${bookImg}" alt="${bookName.title}">` : ''}
                        <h2>${bookName.title}</h2>
                        <p><a href="${bookLink}" target="_blank">Learn More</a></p>
                    </div>
                    `;
                });

            } else {
                books.innerHTML = "<p>NO BOOKS</p>";
            }
        } catch (error) {
            console.error("Error:", error);
            books.innerHTML = "Error loading data";
        }
    });

    Input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            Click.click();
        }
    });
});
