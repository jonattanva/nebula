import { getDispatch } from 'nebula';

const dispatch = getDispatch();

dispatch.queue('https://reqres.in/api/users', {
    method: 'POST',
    body: {
        id: 7,
        email: 'george.bluth@example.com',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/7-image.jpg'
    }
});
