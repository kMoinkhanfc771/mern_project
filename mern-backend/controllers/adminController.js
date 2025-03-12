import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
    try {
        const { email, password, secretKey } = req.body;

        // Validate secret key first
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin secret key'
            });
        }

        // Then validate email and password
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin credentials'
            });
        }

        // Create token if validation passes
        const token = jwt.sign(
            { 
                role: 'admin',
                email: process.env.ADMIN_EMAIL 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set HTTP-only cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                email: process.env.ADMIN_EMAIL,
                role: 'admin'
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during admin login'
        });
    }
};

export const adminLogout = async (req, res) => {
    try {
        res.clearCookie('adminToken');
        res.status(200).json({
            success: true,
            message: 'Admin logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error during admin logout'
        });
    }
};
