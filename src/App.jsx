import { Network, Alchemy } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
  // eslint-disable-next-line no-undef
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);
const App = () => {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      const response = await alchemy.core.getBlockWithTransactions();
      setBlockNumber(response);
    }

    getBlockNumber();
  });

  return (
    <>
      <div className="flex justify-center">
        <div className="card w-4/5 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Number : {blockNumber?.number}</h2>
            <div>
              <h4>hash : {blockNumber?.hash}</h4>
              <h4>parentHash : {blockNumber?.parentHash}</h4>
              <h4>timestamp : {blockNumber?.timestamp}</h4>
              <h4>nonce : {blockNumber?.nonce}</h4>
              <h4>difficulty : {blockNumber?.difficulty}</h4>
              <h4>gasLimit : {blockNumber?.gasLimit._hex}</h4>
              <h4>gasUsed : {blockNumber?.gasUsed._hex}</h4>
              <h4>miner : {blockNumber?.miner}</h4>
              <h4>extraData : {blockNumber?.extraData}</h4>
              <h4>baseFeePerGas : {blockNumber?.baseFeePerGas._hex}</h4>
              <h4>_difficult : {blockNumber?._difficulty._hex}</h4>
            </div>

            <h3>transactions</h3>
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th></th>
                    <th>Detail</th>
                    <th>Hash</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {blockNumber &&
                    blockNumber.transactions.map((transaction, index) => (
                      <tr key={transaction.hash}>
                        <th>{index + 1}</th>
                        <th>
                          {/* Open the modal using document.getElementById('ID').showModal() method */}
                          <button
                            className="btn btn-xs"
                            onClick={() =>
                              document
                                .getElementById(transaction?.hash)
                                .showModal()
                            }
                          >
                            Detail
                          </button>
                          <dialog id={transaction?.hash} className="modal">
                            <div className="modal-box w-11/12 max-w-5xl">
                              <h3 className="font-bold text-lg">
                                Detail : {transaction?.hash}
                              </h3>
                              <div className="py-4">
                                <div>type : {transaction?.type}</div>
                                <div>blockHash : {transaction?.blockHash}</div>
                                <div>
                                  blockNumber : {transaction?.blockNumber}
                                </div>
                                <div>
                                  transactionIndex :{" "}
                                  {transaction?.transactionIndex}
                                </div>
                                <div>
                                  confirmation : {transaction?.confirmation}
                                </div>
                                <div>from : {transaction?.from}</div>
                                <div>
                                  gasPrice : {transaction?.gasPrice._hex}
                                </div>
                                <div>
                                  maxPriorityFeePerGas :{" "}
                                  {transaction?.maxPriorityFeePerGas?._hex}
                                </div>
                                <div>
                                  maxFeePerGas :{" "}
                                  {transaction?.maxFeePerGas?._hex}
                                </div>
                                <div>
                                  gasLimit : {transaction?.gasLimit._hex}
                                </div>
                                <div>to : {transaction?.to}</div>
                                <div>value : {transaction?.value._hex}</div>
                                <div>nonce : {transaction?.nonce}</div>
                                <div>data : {transaction?.data}</div>
                                <div>r : {transaction?.r}</div>
                                <div>s : {transaction?.s}</div>
                                <div>v : {transaction?.v}</div>
                                <div>creates : {transaction?.creates}</div>
                                <div>chainId : {transaction?.chainId}</div>
                                <div>
                                  accessList :{" "}
                                  {JSON.stringify(transaction?.accessList)}
                                </div>
                              </div>
                            </div>

                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </th>
                        <td>{transaction.hash}</td>
                        <td>{transaction.from}</td>
                        <td>{transaction.to}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
