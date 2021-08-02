import React from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {useFormik} from 'formik';
import {loginTC} from './auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from '../../app/store';
import {TriggersTooltips} from './icon/InfoIcon';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import {ErrorSnackbar} from '../../components/errorSnackbar/ErrorSnackbar'
import makeStyles from '@material-ui/core/styles/makeStyles';
import {RequestStatusType} from '../../app/app-reducer';


export const Login = React.memo(() => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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

    const classes = useStyles();

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: '95px'}}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <TriggersTooltips/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    <Grid item>
                        Sign in
                    </Grid>

                </Typography>
                <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
                    <TextField
                        style={{height: '65px'}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        // autoComplete="email"
                        type="email"
                        // autoFocus
                        // error={!!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && !!formik.errors.email}
                        {...formik.getFieldProps('email')}
                    />

                    <TextField
                        style={{height: '65px'}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        // error={!!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && !!formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formik.isValid || status === 'loading'}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <ErrorSnackbar/>
        </Container>

    )

    // return <Grid container justify="center" style={{padding: '30px 0'}}>
    //     <Grid item xs={4}>
    //         <Paper elevation={4}
    //                style={{width: '320px', padding: '15px', textAlign: 'center', backgroundColor: '#E6E7FF'}}>
    //             <form onSubmit={formik.handleSubmit}>
    //                 <FormControl style={{width: '300px'}}>
    //                     <Grid item>
    //                         <TriggersTooltips/>
    //                         <Typography variant={'h4'}>
    //                             LOGIN
    //                         </Typography>
    //                     </Grid>
    //                     <FormGroup>
    //                         <TextField
    //                             label="Email"
    //                             margin="normal"
    //                             {...formik.getFieldProps('email')}
    //                         />
    //                         {formik.touched.email && formik.errors.email &&
    //                         <div style={{'color': 'red'}}>{formik.errors.email}</div>}
    //                         <TextField
    //                             type="password"
    //                             label="Password"
    //                             margin="normal"
    //                             {...formik.getFieldProps('password')}
    //                         />
    //                         {formik.touched.password && formik.errors.password &&
    //                         <div style={{'color': 'red'}}>{formik.errors.password}</div>}
    //                         <FormControlLabel
    //                             label={'Remember me'}
    //                             control={
    //                                 <Checkbox
    //                                     {...formik.getFieldProps('rememberMe')}
    //                                     checked={formik.values.rememberMe}
    //                                 />
    //                             }
    //                         />
    //                         <Button
    //                             type={'submit'}
    //                             variant={'contained'}
    //                             color={'primary'}
    //                             //disabled={!!formik.errors}
    //                         >
    //                             Login
    //                         </Button>
    //                     </FormGroup>
    //                 </FormControl>
    //             </form>
    //         </Paper>
    //     </Grid>
    // </Grid>
})

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}