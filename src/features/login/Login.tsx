import React from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {useFormik} from 'formik';
import {loginTC} from './auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from '../../app/store';
import {TriggersTooltips} from './icon/InfoIcon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


export const Login = React.memo(() => {
    console.log('Login')
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more.';
            } else if (values.password.length > 15) {
                errors.password = 'Must be 15 characters or less';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center" style={{padding: '30px 0'}}>
        <Grid item xs={4}>
            <Paper elevation={4}
                   style={{width: '320px', padding: '15px', textAlign: 'center', backgroundColor: '#E6E7FF'}}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl style={{width: '300px'}}>
                        <Grid item>
                            <TriggersTooltips/>
                            <Typography variant={'h4'}>
                                LOGIN
                            </Typography>
                        </Grid>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                            <div style={{'color': 'red'}}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                            <div style={{'color': 'red'}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                    />
                                }
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                //disabled={!!formik.errors}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    </Grid>
})


//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}