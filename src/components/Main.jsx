import React, { useEffect, useState, useCallback } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import Form from "./Form";
import Table from "./Table";
import main from "../assets/main.jpg";
import profile from "../assets/profile.jpg";
import { collection, getDocs } from "firebase/firestore";

const Main = ({ accountList, getAccountList }) => {
    const [itemList, setItemList] = useState([]);
    const [userId, setUserId] = useState("");
    const currentEmail = getAuth().currentUser;

    const userName = accountList.find(
        (acc) => acc.email === currentEmail.email
    )?.userName;

    const itemCollectionRef = collection(db, "restaurants");

    const getItemList = useCallback(async () => {
        try {
            const data = await getDocs(itemCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                itemId: doc.itemId,
            }));

            setItemList(filteredData);
            setUserId(getAuth().currentUser?.uid);
        } catch (error) {
            console.log(error);
        }
    }, [itemCollectionRef]);

    useEffect(() => {
        getAccountList();
        getItemList();
    }, [accountList, getAccountList, getItemList]);

    const logoutHandler = () => {
        signOut(getAuth());
    };

    return (
        <div
            style={{
                backgroundImage: `url(${main})`,
                backgroundSize: "cover",
                backgroundAttachment: 'fixed',
                minHeight: "100vh",
            }}
        >
            {/* navbar */}
            <div className="bg-danger p-2 d-flex justify-content-between">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <h2 className="fw-bold text-white mt-2">YELP</h2>
                </div>
                <div className="d-flex align-items-center">
                    <p className="m-3 text-white h5">{userName}</p>
                    <div className="gap-4 d-flex align-items-center justify-content-center">
                        <img
                            src={profile}
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                            }}
                            alt="profile?"
                        />
                        <button
                            onClick={logoutHandler}
                            className="btn btn-danger d-flex gap-1 justify-content-center align-items-center"
                        >
                            Logout{" "}
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* end navbar */}

            {/* content */}
            <div className="mt-5 d-flex flex-row align-items-center justify-content-center">
                <div className="col-md-12 col-lg-6 mb-4 d-flex align-items-center justify-content-center">
                    <div className="bg-dark rounded p-4 w-75">
                        <Form
                            itemCollectionRef={itemCollectionRef}
                            getItemList={getItemList}
                        />
                    </div>
                </div>

                <div className="col-md-12 col-lg-6 d-flex align-items-center justify-content-center overflow-x-hidden">
                    <div className="bg-dark rounded p-4 w-75">
                        <Table itemList={itemList} userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
