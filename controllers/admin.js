import { prisma } from '../db/prisma.js';
import bcrypt from 'bcrypt'

export function get_admin_page(req, res) {
    res.render('adminDashboard', { title: "Home", activeRoute: 'dashboard' });
}

export function login_get(req, res) {
    res.render('admin/login', { title: 'Login', error: null })
}

export async function login_post(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('admin/login', {
                error: "Please enter the correct username and password for a staff account. Note that both fields may be case-sensitive.",
                title: "Login",
            })
        }

        req.session.user = { id: user.id, username: user.username };
        res.redirect('/admin');
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res, next) {
    req.session.destroy(err => {
        if (err) return next(err);
        res.clearCookie('connect.sid');
        res.redirect('/admin/login');
    });
}

export function change_admin_name_get(req, res) {
    res.render('admin/changeAdminName', {
        title: 'Change Admin Name',
        error: null,
        success: null,
        activeRoute: "",
    });
}

export async function change_admin_name_post(req, res, next) {
    const { adminName } = req.body;
    const { username } = req.session.user;

    try {
        const existing = await prisma.user.findUnique({
            where: {
                username: adminName,
            },
        });

        if (existing) {
            return res.render('admin/changeAdminName', {
                title: 'Change Admin Name',
                error: "Admin name already exists",
                success: null,
                activeRoute: "",
            });
        }

        await prisma.user.update({
            where: {
                username,
            },
            data: {
                username: adminName,
            }
        });

        req.session.user.username = adminName;

        res.render('admin/changeAdminName', {
            title: 'Change Admin Name',
            error: null,
            success: "Admin name update successfully!",
            activeRoute: "",
        })
    } catch (error) {
        next(error);
    }

}

export function change_admin_password_get(req, res) {
    res.render('admin/changeAdminPassword', {
        title: 'Change Admin Password',
        error: null,
        success: null,
        activeRoute: "",
    });
}

export async function change_admin_password_post(req, res, next) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { username } = req.session.user;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return res.render('admin/changeAdminPassword', {
                title: 'Change Admin Password',
                error: "Invalid old password",
                success: null,
                activeRoute: "",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.render('admin/changeAdminPassword', {
                title: 'Change Admin Password',
                error: "New password and confirm password do not match",
                success: null,
                activeRoute: "",
            });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {
                username,
            },
            data: {
                password: passwordHash,
            }
        });
        
        res.render('admin/changeAdminPassword', {
            title: 'Change Admin Password',
            error: null,
            success: "Admin password update successfully!",
            activeRoute: "",
        })
    } catch (error) {
        next(error);
    }
}