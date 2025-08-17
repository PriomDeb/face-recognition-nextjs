import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import InfoCard from "@/components/InfoCard";
import {
  FaUserFriends,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = async () => {
  return (
    <div className="">
      <InfoCard
        header="Total Students"
        data={7}
        IconComponent={FaUserFriends}
      />

      <InfoCard
        header="Present Today"
        data={95}
        IconComponent={FaCheckCircle}
        color="text-green"
      />

      <InfoCard
        header="Absent Today"
        data={33}
        IconComponent={FaTimesCircle}
        color="text-error"
      />

      <InfoCard
        header="Attendance Rate"
        data="74.2%"
        IconComponent={FaChartLine}
        color="text-brand-100"
      />

      <p className="text-center text-error">Dummy numerial data right now.</p>
    </div>
  );
};

export default Dashboard;
