import Image from "next/image";
import React from "react";
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { ExampleProfile } from "./DropDown";

const Headers = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();
    return (
        <div className="w-full py-3 shadow-sm border-b bg-white sticky top-0 z-40">
            {/* left */}
            <div className="flex justify-between max-w-4xl mx-4 lg:mx-auto">
                <div
                    onClick={() => router.push("/")}
                    className="relative w-24 h-8 lg:inline-grid hidden cursor-pointer"
                >
                    <Image
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXgAAACGCAMAAADgrGFJAAAAkFBMVEX///8mJiYAAAAjIyMfHx8VFRUdHR0YGBgaGhoNDQ0TExMQEBAKCgoUFBQFBQXk5OTU1NTt7e3IyMioqKjq6ur4+Pi1tbWRkZG3t7fDw8OcnJyDg4PQ0NB2dna/v79UVFRoaGhfX1+Xl5dCQkItLS2Li4tvb2+kpKQ7OztNTU3d3d1JSUl+fn5jY2MxMTE9PT1GAyKxAAATjklEQVR4nO1d6WLiuLIGCYwNjoGwBwgkQCB0lvd/u6utFskioXviOc0d169AZJX0qVSbSqbRqKmmmmqqqaaaaqqppppqqqmmmmqqqaaaaqqppppqqqmmmmqqqab/V3R+fBxMKuWwWPQr7f8mabETeS7E5rE6Fp+iEMV2OqyOw+1R/1W0mppa4qMqqewLzSDJxHZcEYfbowcHu4W+IlxWwnFI82oY3B5tRJNRNqqGyyIHDkU1DG6NhvvUSDrA0jtWw2eeOQZyXw2DG6Nxz0BePAHy3YqAH/UA+F01DG6LxrnUYIjBEPRN96EaTscuWJHXahjcFE1aDvcGAn/3XA2rBwT+qRoGN0W7xOA+bRDw7YqAf247BslLNQxuidZGCjvrxr8A/KED7uS6GgY3RI8GbJnovwn4WTXMlgj8WzUMbocmFmth0gTjqoF/Sx2DzqEaBrdDW+vA/zIfKgd+DcBXpctuhlwML1bmU0XAj54fRtP54n513lYdKNwM7QwS8tN+qgb4e9Hu9npZUQhKB8n96/v6MFML8ng/+A8mzO4t0tnUfqwG+FfKvhHJVpJ21IJkuVqPotozgL+QHCbCfawE+ImI4O6TOP8cu5ugs8UEo5lKgF9dAfx/7WDExTM5HDn1qwD+Mb+MuFM7zZ/jdhvUlr7AVQL8QPS6d+1OJ00TX9lLRy1RUUrur6WBxVl+wBcI/I/GN/PR8WF2OCzXL0+EfKfbSWRzv99/fL5Wlrf5WzXY853BgML3SiSe0RnVfXFfCQNOo50Q4umvdFU3VgDpuCkGfP8c9fXOXzgi0yc15VMkNh0g8GIQfXJy3ORCNF+m3459MnrKhJDbiy1fhdaj6fd2uz/7pYb78faFKPSDTs5lTPq/Ux/gYCgW+HQZ+Gc1qP0hQHmlkRVvcV6LTq4XVOblsw4GfHTdZsIchckkb5sxTR9G93HgnrFlMTdMH0YLr+XWZf7vvlGak60wlk6m4qTHNDk+jFYBrB9C5O9HFJWzkg2xO/JG/b366mXRuI4gF0kgRIDXall2xI6D/GIj0FSsI5thJiSAW5IhBnxk0YYnOJFVLMVSgSe6vULsykI92eWs5brReDMtP+mIHn3Yb466BiLFnlr6SCLLuz2lofjQjYJMuqLlVjY1C9UTbFxdDUgikusSIaBxqZbjHAde28INzfp0hxZSlGqfHshr75VKFRjwZUEepp7To/AUDo9N0HLSTHjL7N21lLkESdhCC5f+u0D3KCWW56gPPNlGgVH37HfPcG4sUJkencTI/OMam4LAD8NvysC3aPInkhElbnO/zwGLlr4EvrxX9kFmQRxhgUO9dEr8lsXzHlquXBNklGwd69H6dRdahL6Pu+YJR2SCWsGo3eFNQa1hXE3spnVN9qN/DfCbEPinTpNTgOAHm0nZgH4F/LvfryL8ItBL6+7llo4lhuDNzvN4cVyfhOilLZkIv7hhLy/2lJVHbYEfkT4ElO6ZtHWv8Acn16iaEPhjkAAoPGWzYP+VWSMkyh6I8F9z/JfsKkN1x3n4dW0sBdFSZq7gGwVkkPxWpQ6LbooAZ9zWLnEFpfKQmLbXj5UZWuBPtFjJu23wwnYgfPclSemN9kvgXVUAiFIP2Pv6hA8hEgtcBn6Cm76VHfuT/gNXAr5BoE1VvD6Oh/ebjLXsQ3fNC8QY0+q0T/PxcLDkUtOKAK/jHa5LnTR6zK46xXcHcTm6Qd8D7z6KKUw/89Rm7yJcAfBh6eQBdGvrZJXQOJHxnqaoY4XzIZaEPCqlaCratCAdt4E2PQcWUxm80u2+YMAvmUZ0wDPlc+VhsmN0h6mSb4F3TyiTCsDn3LoOv1F2MAVPoDSh0MgWAMO0hWcQUC8XOOxfiDIqpcElkSeJxyYJ1viM0EuVp/KoDaYF68u5qt4iX5dsseiR4RyUgX/1gP80D+Tqvy03/4JHDQx42Y7wI+A//H9goRPz/fF81tNLKJXMz2IaDPcG2KJeZo5aZJnxC/TP1hVXlZcYLhjw3I42pXFVrfYF8K9LtjwKn/N3wFvbaRYaZAMdOENMSmNhHAEflE7ChBmaTOQ58Oigc1dHYsxGGFpntDudzh8Xq/OrJPAs4Sbj5YpY28njLihx1s8aaZBuGvbE9Kifab24B++uy7Q+mVVHA/kF8MZY2z1txApa+j4j7rpuVNUh8EE8iRh7wS56x6ykG+EC/9zQW0R4Z1oZo6n7LJmkaVZ+htxQXmL4yIDX/1e7hqd1DShi7LorBy9Rmkib8XAfvwHe/luMOAB+cANOoYwH6gS8H4w+OO9Rdvi3COcdYxDdaTEQDdSw7yLDfU8iK4iLfQF4MwElHQ54fYBj1KsSJFBtV94sGHY0sD0X/EaA/2VHYtxTs89aRkugNg+Cm08n8u0o/wUC79eswkbxXQLY99wSg+L3TQiOm5SSGSAu5KrcAL7x3bJtZDnmBLxmr5MQbh66e7PoKpoRse6+oOFJT895A18Db8XG6hbck8GlnTF4WyIWSCDwQZgBneVeNAb7g7t2YNP92stxGVezajgNMN604IO45EBVbcrccbhNkS4bTuAb7hvtFOulUgsMeyoLcihf0EF0ZHtp/lyVgd9JlADjrzpRwDxm6K2/g5ZPW+XML97E8cOMc3wVgQfzRMZxOZ2UgX9t8f4gsKMCNjSjfnw9dV/zvYfAHzQ+RgxckKHZCQsXDCH/jSuT42XXxSIR4D8JeGtF+gFWftKF+c9SlJKkCLwvsHhBx49nQZ1BuVWDbZlAw5WANytEDvpHyfmFQCiwNqDPO0v6DixIOlum7tjI9acmbyBTo0Hgr03KW3LoEfAoGQS8mQtswYhWNaQXB0POkrrBggNfmcP+DpxMmIukzC7eKAnYFuHXRreQAS5vqU3UrDRWoL1ZHATAJ0vThd7iO6wS0MenetwgJX92phkB3uWElG4wrgd4BavSVA3p+EJ+Yk4qbfrq5gLwEMqEeQ43GuZ7gpzywFITrAdmIvTq005BxUh6BcQj8LtBoGLAN3W0Ya0EZE765i9dCPrjwH8g8IYtbExUGn7SRS+TGPRzDACFp4sReL6TyakJw20AnlwgcDpawV4CaABYE2DSKc2qvIRxY4HA8wB0ynMxtr0bhxJDw2hcHfDp2mh1DHBALWMIYIeo2qRbpWElZU84mJgZ8CHuuHUKS4jLwKPfuYy2bPbcZ3NgSc4Qamk0LWiOA52MwLOjeg94a9NciFGsNCpm+01+Bni6fOaC+fRNR4JShoPxi8C0s2d04OSDEi1Mq2A+0Af+gvTBXJh4Q2ohvByH4b/9aFQLOxyDBafHyAH1T2tWMeDBAWrinnEleNmjxsHsjp8CHjWfm2prrU/XKK2BwQ3PdunTyMw12dGpEM6BEtce8CR9visGu5c5/QBBcAEae3BhlY5z+Mjg6lUPV5a8Mt8KgdvEV3bEgHcIOCPfG+mejQ3/Z8BjSE8Io49iInB02kGGuJXTQNF0Xwl5cC5oz3o5PIyCC3/bn8vAw/iCwBx7sJHq2NfwlHyglb0EPKjQu1jmrIkbxM2k86B1mvUvfhp4TPw1PZ93Bh4gA147JyyFsoM8IiooyptfAN4fNOw/Fr5/YxId8Caw564pxE/E4BLw4K9GU5ZNdOLcxkje9ljH8Gd+vCMCHrdyiwHPpnso+3V69inzNiZgM5v5yIcnAL5/QeLRf6ZOLwBP3hL25yXRwBmiLy8BD/O6IPEwFJiK7tepTdfodyJXIgSedGjKgGdRagR4favHSyCgxXCNNnRS4wGPsAWDhriKeTUXVA1kNy3wevv7ySAEHi1p/4JxhbLadlzHw0agKgYctXP/rk6SeXRfnlibOPDouhzJaFcy86MRPPo2AeNCNNHV8YzrEr4OBo1OO/EFMeheYNRpuNMaP4X0UpJ4yq56BzmQhPEkgwEPuoqfb7vshdOjXCSuv2AUAZ7pN94ngIXGdJLJ0rtQUKyM4ktkeojeL0aVFMAJILCUAZxnBKEW6kMNvHYDMt/dhGQyMyJxT4qsNGMwI+HDFFGHFIFT+05M2BwexbZxJSHwJHu8doLlDlHiwY9/azfLxZIupWGW7KWjVBUgxNPddGLqh0W4bMwxhNynf3rBypesTxse6cKCM5RTNjQiymmwobDDbEyQ7BB4qBF0nhNbMRW3X1ugHwGeTtW92WCVgztqOLuY1acZ+M+jxkjouBHUPBNiPAoKM4UYt8i0xNZHltzU1FnWoIYNfBWG8iaapsADdpY24moFEyRUQASb1znYlMhXI7n6Uh0Bj1EfcfWGiErDycBJhnpVE2jHfKGTJ2rHoDqnY9Q+V5f8Ybo+IkodXmqZGlXbCxIKlOylKcTTwriC7Gt2h4vSp6R+wAF051QkUiokiNVERwmBpz1JsHheNr7/xKJ96JUsqybAKZ2pbvRhCwGHauspIZvLJYSVilBjWm9mE5lI7h+ysqKhxWVwRpcQ0/3cXNGOZP4VHiEgVFgCDE2U7ikVKl4iZEweNZs+N9I0br2rFyI2XVI1GlqZT5j7jCurHr07Qmc8S8ZNGqKMdS/c3XtgRaydZsk157MgJFCpcLW0iWhzXqRFCojVngx8Hsg9kTFI4rQon+EjA78iA1dcIzAgvdr/dWI+4ScPAoz2gpWFPOGkJ9UcIaRlZ01GjMOsJYVg3IFq+zW/5YMvklqaF+oPZkYHjCdqiQOr2WPOGAEP29HZWxisWprr3w2D6oyEBhn479tgrsjiWf9tq/b7oiXp3IlfLXYx7TqogFFRV/eZ7R8ERr9VRLpTGNzhbNdTwdSShRqKOrFTdswLAxRzUty0kzW7ZOcHQlzguY3A9AduDad9IbJRRuT6YIoOP9FO4nr7iRQWuuWaYcuyM5cL0pZtOqFDQKyJxBI4I/LDXWomTqWTEI+ZCrwuSLgbjv6ICSDYxnMmps1Ll5XpNNxNTOksPCaDJP36TluB+9xbbGWCqHMWVj1DsAxHAKTk74Hj9RfWp+VTZ9SqQS9cEJqw4Y7OsovX6fk8YkGGxJ2LSbd8vZjpu1SFdvFQattbOy2XUIeqRYPNRD3bpVcNWckemZNgKlq/4EiAE5NY8/p212whoO5+8zo3j088Xf0glCuDnbPoCEsg8IgCdI2VMbVgX98C8giz7JSB+SVLDAwxO4SrTKvUyoTocdxRhVBBbmq3ivHQyDFpn6b3I3MLTa8B4FUsh42V2k5qBVCjd07T1fzV4P40R111ITlIlZJP/cb5PVN8mX18elwdpbHLRwxBZet+MjxouV2gB8ON/9IJGVVbLXAtRtNXNbfi+rQN+Aes+iJe6ea7Eraqz3fJOUnu/H0EptDapimZzV5hlizVi48arSNMxa9SSwvWUmR6+Vt71JGX35eJDBLVU2J8gSWmQ1p50dU8M+21wILIQoiOvq9Jat4Lc5/sRVpm5TcOK9nVd0FDUf2KwIVjDOCr8F1WPD8H7yIYxoFvN/n2P3uNMMuwDl410bEXFJ791tozOgRc0uYQbeUXjvNb4fWkp/Mr9XtyuZUZb6nC5gvA26vjGza3oXeXrXwj8ovBuZEwRQmeSclCb2HUUuBw5iKYSlPfXAzedDjnS0a9vnA8yTXiXwtr2978xdhMyA+OXCakyfGe7Jh2LAWoeILp3DLktZeMD5bq8wJ2Z4Z8/jsveHSxt+f4u7uNQfpUL6/Lg6YsAhlvRZcrf9kWm1I4sxBOc6deVu0IXzdlRoejjZlIoDVo2JEAW6y0jaldBvv3FfBK2zj7kOAx8Bt0ruTjRPM4wNeJGSGuT/nKdED9vatskeK33oyx92MAQ8OmyHu9vOwajU8i6wkR3IAYHzdCPdDudNq9QjRnsTTR8E2oR3OxHUa+Vk+dvB193ooiU8Z6S9tQGT3b8sNcbB9KTPx/6cBNDrl6rBBPNCjVufoqC38m4vwuCj1p+w6KiR1YLq54BfhRmv7k9bWrmkRUbgbz0XEeE6XBdBQVgf5iNFseni+9h0DTajqaR/6reow8NbmfTsP3C6hBjRbWMJ8zSqd95zmrx/x3HjQmaiil3jXP0eiRWg6mx9E8/uKLkM7z0fS6lvSIBb59Wy/jHDDFWtUvPVRM1o2Xt/VOvIV3I/Y2gbehQ/h6gr+brH+OQeht/taRmUN+U69bti8LSX7tbxl4k8Aqtv/rYfwO2WAq+YBiiNsE/tBR7udNGdY3h/sEzuxu882hr5nYh2HSX00vJsJs7Sd4rnGbwD++VfhbcxXQi0HbZmGLWwb+xsim1aT1IMMDz5oqo2XBoRa3bFxvitxL5yD36p8R1lQZubPbAtKMYVFLTdWQO5tIoUDJnez5L6Go6efJ1pHKLmSV3ELUvyBYMbkDVBG+TK3+PbWKyRYw0KsKoOjzP/8jRxWTe+0dywG7gqA/u4BU07VkT1j5K2VcLUTtxldKzpLyMl97U6R2aqol68N7F67S0h6o6efJlo3xW0quuiq/qbOz2yNrSXmFlbOtX1bV1PSPyVbx87JxW+BZe/EVk42WmOsYsbY1VUFG4jtUwmZfxZ2Ev2hR00+TqZqnV366fEGdEq6crGqBN4UM7M2TS1cSavpBskmyzmne7y+2tpJMXPlO35r+EdlfstC/7JEn9uT1j95WUtNv0yLjV6zyj/qQ+9+iyXMq7hL9o6Rt0arVzL9Kq+f3U2v/NLupIqyaaqqppppqqqmmmmqqqaaaaqqpppr+Avo/HBIeBTR3ceYAAAAASUVORK5CYII="
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div
                    onClick={() => router.push("/")}
                    className=" relative h-8 w-10 lg:hidden flex-shrink-0 cursor-pointer"
                >
                    <Image
                        src="data:image/png;base64,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"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                {/* middle */}
                <div className="max-w-xs ">
                    <div className=" relative rounded-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-500 " />
                        </div>

                        <input
                            type={"search"}
                            placeholder={"Search"}
                            className=" bg-gray-100 text-sm block w-[12rem] pl-10 pr-2 sm:text-sm sm:leading-5 border-gray-300 rounded-lg py-2 focus:outline-none  focus:border-gray-300 focus:text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out "
                        />
                    </div>
                </div>
                {/* right */}
                <div className="flex text-center justify-center space-x-4 items-center ">
                    <HomeIcon
                        onClick={() => router.push("/")}
                        className="navBtn "
                    />
                    {!session ? (
                        <button onClick={signIn}>Sign In</button>
                    ) : (
                        <>
                            <div className=" relative navBtn">
                                <PaperAirplaneIcon className="navBtn rotate-90" />
                                <div className="absolute -top-2 -right-1 text-xs w-4 h-4 bg-red-500 text-white rounded-full animate-pulse">
                                    3
                                </div>
                            </div>
                            <PlusCircleIcon
                                onClick={() => setOpen(true)}
                                className="navBtn"
                            />
                            <UserGroupIcon className="navBtn" />
                            <ExampleProfile session={session} />
                            <div className=" relative md:hidden inline-block">
                                <PaperAirplaneIcon className="h-7 w-7 rotate-90" />
                                <div className="absolute -top-2 -right-1 text-xs w-4 h-4 bg-red-500 text-white rounded-full animate-pulse">
                                    3
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Headers;
