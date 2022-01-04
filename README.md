# toile

Toile is a tool to help you manage your time. You enter what you want to do, how much time you think it will take, and a due date and Toile will set up a schedule for you. As you work and more information comes to light and roadblocks inevitably present themselves, you can refine your task list by adding subtasks with their own durations and due dates. Here's a look at the process:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/147998262-6db531a0-8d31-40cd-9a37-16ee8dbfea52.png">
First is a list of a couple of projects I'm working on. There's this project - Toile - and then there is a [hush box](https://thehometheaterdiy.com/projector-hush-box/) that I'm going to make for my projector. Let's look at what I've entered already for the hush box. Clicking on the circle on the right gives us:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/147998289-145a91fd-1224-4efc-8a3c-6585b12a3088.png">
I've guessed here that it will take 250 minutes to complete as a starting point. The due date is set for a little later on in the month. Going back to the main view and clicking on the card anywhere but the circle opens up the list of subtasks:<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/147998763-440e4f90-a8a4-4438-b7b8-a46c7079ecf9.png">
There are none there yet, but with the 250 minutes earmarked for the project if the "Set Schedule" button is clicked, then a schedule will be layed out for the project in 25 minute [pomoderos](https://francescocirillo.com/pages/pomodoro-technique):
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/147999072-cf5f7452-81e7-4b45-b752-d6c09650b4d8.png">
More specific tasks can be added by clicking the "+" button. Doing some planning is a good starting point:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148000441-b4e58c52-05a2-41e1-b258-952fe346f659.png">
After adding the task, clicking "Set Schedule" again gives a more descriptive schedule:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148000269-f171b58c-cbf3-4146-8cfe-1f09d5a81331.png">
Adding specific subtasks to the "Plan" subtask with appropriate durations and setting the schedule:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148001112-1d614b81-3533-4098-b934-88b76d9e2e4b.png">
Oops. Buying materials isn't really part of the planning phase, so we can rearrange the list, (currently by scrolling down to where there are two navigable lists, pressing shift and dragging and dropping):
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148002350-8bfc6111-6a18-47f6-8c27-a340a0dda0bd.png">
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148002386-5dd03db6-1d4f-4d7c-b954-4023360ed6ac.png">
Filling out more tasks:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148003024-19516c7f-63c5-4dd1-8699-07647dc4c305.png">
So it seems Larry borrowed a bunch of things, including the tools you need to make this project. You need to get them back, but this doesn't necessarily fit into the hierarchy of this project. Adding it as its own project:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148003354-47937f58-e538-446a-9a44-3f1ea9fdb4c0.png">
Then pressing shift to drag and drop the circle sets "Get things back from Larry" as a prerequisite for nailing together the project.
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148003443-a893a6ac-2092-48fa-87ce-200bfecbeeb3.png">
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148009778-7b1bca77-8c23-4932-96cf-3b11b044a6d7.png">
Then setting the schedule:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148010315-acbba059-4347-49b2-bcd5-7ac1e4fb927e.png">

This is a bit of a contrived example, (and you'd probably need to work out a good time with Larry) but illustrates how to create more of a web of tasks (or [toile](https://www.wikiwand.com/fr/Toile_d%27araign%C3%A9e) in french) 

Another feature of the software implemented as of yet is indicating that a time slot should not be scheduled in. Right now this is done by clicking on the timeslot:
<img width="1392" alt="image" src="https://user-images.githubusercontent.com/12875280/148012318-9e25f930-9c3d-4a51-baf7-baffc15f2e6a.png">



### Features to be implemented:
- User Registration
- Calendar importation / set time event support
- Pomodoro timer integration with actual time worked tracking
- Project collaboration
- Travel time calculation

### Bugs:
- Items checked off of list are still scheduled
- persistence of order changes/prerequisite setting

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
