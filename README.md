# Mic Lockr
### Thank you for checking out Mic Lockr, my full-stack web application based on Flickr.

<p align="center">Live link: https://mic-lockr.herokuapp.com/</p>

### Flex your vocal cords and share pictures of your favorite microphones!
####


# Splash page
![Screen Shot 2022-08-27 at 11 58 06 PM](https://user-images.githubusercontent.com/97048214/187061719-1543cd69-736b-43a8-a6de-b429c33cc17b.png)

# Mic Lockr page
![Screen Shot 2022-08-27 at 11 59 29 PM](https://user-images.githubusercontent.com/97048214/187061756-eec708bf-6a81-4749-8171-142c74896edc.png)

### View photos from all users, and click them to navigate to that image's page.


# View a Single Mic Page
![Screen Shot 2022-08-28 at 12 00 35 AM](https://user-images.githubusercontent.com/97048214/187061774-2b794cee-460b-46af-b53e-9bfc56b308c0.png)


### View single image details and leave comments.


# Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

# Features
* Sign-in/Log-in with your own creditionals or via our Demo User
* Create, Read, Update, and Destroy Images with Error Handling
* Create, Read, and Destroy Comments with Error Handling

### Things to develop in the future:
* I would love to add AWS integration
* I want to create personal Lockrs to allow users to keep track of mics that only they have added.



# Technical Implementation

####
I had an ongoing issue where viewing a single mic would return a blank screen upon refresh. This was because my return statement had been relying on my Redux store that was not hydrating fast enough. I was able to fix the issue using a short circuit (&& &&) before my return, giving enough time for the store to be there. 
####

```js
return personLoggedIn && currentlyViewingThisMic && (
    <div className='mostOuterDiv'>
      <div className='singleMicDiv'>
      <img className='micImage' src={currentlyViewingThisMic.imageURL} alt={currentlyViewingThisMic.title}  onClick={() => history.push('/')}></img>
      <h1 className='singleMicTitle'>{currentlyViewingThisMic.title}</h1>
      <h2 className='singleMicDescription'>{currentlyViewingThisMic.description}</h2>
    </div>
    <div>
      {editButton}{deleteButton}
    </div>

    <Comments />
    {commentButton}
    {showCommentForm && (
      <AddComment />
    )}
    </div>

  )
}

```

