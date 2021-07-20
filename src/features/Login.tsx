import React from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'


export const Login = () => {
    return <Grid container justify='center'>
        <Grid item xs={4}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label='Email'
                        margin='normal'
                    />
                    <TextField
                        type='password'
                        label='Password'
                        margin='normal'
                    />
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox/>}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>
        </Grid>
    </Grid>
}
