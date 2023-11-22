import './globals.css';
import { Lato } from 'next/font/google';

const lato = Lato({
    weight: '300',
    subsets: ['latin']
});

export const metadata = {
    title: 'Demo'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={lato.className}>{children}</body>
        </html>
    );
}
