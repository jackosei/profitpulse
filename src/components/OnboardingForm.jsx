import { useState } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const OnboardingForm = () => {
    const [traderName, setTraderName] = useState('');
    const [accountSize, setAccountSize] = useState('');
    const [riskPerTrade, setRiskPerTrade] = useState('');
    const [currencyPair, setCurrencyPair] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('No user is signed in');
                return;
            }
            const uid = user.uid;

            // Prepare user data
            const traderData = {
                traderName,
                accountSize: Number(accountSize),
                riskPerTrade: Number(riskPerTrade),
                currencyPair
            };

            // Store the data in Firestore under the user's UID
            await setDoc(doc(db, 'traders', uid), traderData);
            console.log('Trader details saved successfully');
        } catch (error) {
            console.error('Error storing trader details: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Trader Name:</label>
                <input
                    type="text"
                    value={traderName}
                    onChange={(e) => setTraderName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Account Size ($):</label>
                <input
                    type="number"
                    value={accountSize}
                    onChange={(e) => setAccountSize(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Risk Per Trade (%):</label>
                <input
                    type="number"
                    value={riskPerTrade}
                    onChange={(e) => setRiskPerTrade(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Currency Pair:</label>
                <input
                    type="text"
                    value={currencyPair}
                    onChange={(e) => setCurrencyPair(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};
export default OnboardingForm;
