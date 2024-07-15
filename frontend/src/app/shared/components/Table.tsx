'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrices } from '../redux/actions/priceActions';
import { fetchPricesFailure, fetchPricesRequest, fetchPricesSuccess, setSymbol } from '../redux/reducers/priceReducer';
import { RootState, AppDispatch } from '../redux/store';
import io from "socket.io-client";

const api_url = process.env.NEXT_PUBLIC_API_URL;

const socket = io(`${api_url}`);

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error, symbol } = useSelector((state: RootState) => state.prices);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      dispatch(fetchPrices(symbol));
    }
  }, [dispatch, symbol, isClient]);

  useEffect(() => {
    if (isClient) {
      socket.on('connect', () => {
        console.log("Connected to socket");
      });
      socket.on("UPDATE_DATA", (message: { type: string; data: any[] }) => {
        if (message.type === "UPDATE_DATA") {
          dispatch(fetchPricesRequest());
          try {
            let newData = message.data.filter((item) => item.symbol === symbol);
            dispatch(fetchPricesSuccess([...newData, ...(data.slice(0, -1))]));
          } catch (error: any) {
            dispatch(fetchPricesFailure(error?.message));
          }
        }
      });

      socket.on('disconnect', () => {
        console.log("Disconnected from socket");
      });
    }
  }, [dispatch, symbol, data, isClient]);

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(e.target.value));
    setModalIsOpen(false);
  };

  const disappearAnimation = {
    animation: 'disappear 0.5s forwards',
  };

  const dropAnimation = {
    animation: 'drop 0.5s forwards',
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center justify-start py-10">
      <div className="flex flex-col items-center space-y-6">
        {isClient && (
          <>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent">
              Currently Tracking : {symbol.toUpperCase()}
            </h1>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
              onClick={() => setModalIsOpen(true)}
            >
              Change Pairs
            </button>
            {loading && <p className="text-xl">Loading...</p>}
            {error && <p className="text-xl text-red-500">Error: {error}</p>}
            <table className="min-w-[380px] bg-gray-900 text-center rounded-lg shadow-lg">
              <thead>
                <tr className="border-b-2 border-gray-700">
                  <th className="py-3 px-4">Serial</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((price, index) => (
                  <tr
                    key={price.timestamp}
                    className={`border-2 bg-gray-800 text-white border-gray-700 ${index === 0 ? 'animate-drop' : index === data.length - 1 ? 'animate-disappear' : ''}`}
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{new Date(price.timestamp).toLocaleTimeString()}</td>
                    <td className="py-2 px-4">{price.price.toFixed(5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {modalIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setModalIsOpen(false)}
        >
          <div
            className="bg-gray-800 rounded-lg p-6 space-y-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white">Change Pair</h2>
            <select
              className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg outline-none"
              onChange={handleSymbolChange}
              value={symbol}
            >
                <option value="solana">Solana (SOL)</option>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="tether">Tether</option>
                <option value="bnb">BNB</option>
            </select>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;




// <option value="solana">Solana (SOL)</option>
// <option value="solana">Solana (SOL)</option>
// <option value="bitcoin">Bitcoin (BTC)</option>
// <option value="ethereum">Ethereum (ETH)</option>
// <option value="tether">Tether</option>
// <option value="bnb">BNB</option>
