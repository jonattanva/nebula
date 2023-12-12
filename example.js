import { getDispatch } from 'nebula';

const dispatch = getDispatch({
    priority: 'offline'
});

const response = await dispatch.queue('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify({
        name: 'Solid',
        lastname: 'Snake'
    })
});
