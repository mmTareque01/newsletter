import { title } from "process";
import { BiBadge } from "react-icons/bi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";


const metrix = [
  {
    id: 1,
    title: "Subscribers",
    icon: MdOutlineGroup,
    value: "3,782",
    percentage: "11.01%",
    trend: "up",
  },
  {
    id: 2,
    title: "Newsletters",
    icon: IoCubeOutline,
    value: "5,359",
    percentage: "9.05%",
    trend: "down",
  },
  //   {
  //   id: 3,
  //   title: "Orders",
  //   icon: IoCubeOutline,
  //   value: "5,359",
  //   percentage: "9.05%",
  //   trend: "down",
  // },
  //   {
  //   id: 4,
  //   title: "Orders",
  //   icon: IoCubeOutline,
  //   value: "5,359",
  //   percentage: "9.05%",
  //   trend: "down",
  // },
]

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}


      {
        metrix.map((data) => (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <MdOutlineGroup className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {data.title}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {data.value}
                </h4>
              </div>

              <div>
                <span
                  className={`
    inline-flex items-center text-sm font-medium px-2.5 py-0.5 rounded-full mb-1
    ${data.trend === "up"
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"}
  `}
                >
                  {data.trend === "up" ? (
                    <FaArrowUp className="mr-1" />
                  ) : (
                    <FaArrowDown className="mr-1" />
                  )}
                  {data.percentage}
                </span>

              </div>


            </div>
          </div>
        ))
      }

    </div>
  );
}
