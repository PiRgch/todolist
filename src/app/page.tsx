import { AddModalTodo } from "@/components/AddModalTodo";
import Todolist from "@/components/datatable/Todolist";
import Title from "@/components/Title";
import { RetroGrid } from "@/components/ui/Retro-grid";

export default function Home() {
    return (
        <div className="relative flex flex-col w-screen h-screen">
            <RetroGrid className="absolute inset-0 z-[-1]"/>
            <Title/>
            <AddModalTodo/>
            <Todolist/>
        </div>
    );
}
