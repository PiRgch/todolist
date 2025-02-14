import { AddModalTodo } from "@/components/addModalTodo";
import Todolist from "@/components/datatable/todolist";
import Title from "@/components/title";
import { RetroGrid } from "@/components/ui/retro-grid";

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
