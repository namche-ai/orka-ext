import ClineLogoVariable from "@/assets/ClineLogoVariable"
import HeroTooltip from "@/components/common/HeroTooltip"

const HomeHeader = () => {
	return (
		<div className="flex flex-col items-center mb-5">
			<div className="my-5">
				<ClineLogoVariable className="size-16" />
			</div>
			<div className="text-center flex items-center justify-center">
				{/* <h2 className="m-0 text-[var(--vscode-font-size)]">{"What can I do for you?"}</h2> */}
				<h2 className="m-0 text-[var(--vscode-font-size)]">{"我是下单小助手，有什么可以帮您的吗？"}</h2>
				{/* <HeroTooltip
					placement="bottom"
					className="max-w-[300px]"
					content={
						"I can develop software step-by-step by editing files, exploring projects, running commands, and using browsers. I can even extend my capabilities with MCP tools to assist beyond basic code completion."
					}> */}
				<HeroTooltip
					placement="bottom"
					className="max-w-[300px]"
					content={
						"我可以帮您接入公司内部的订单管理系统，一步步完成日常的订单运营工作，包括下单、发货、退货、换货、查询，也可以协助处理本地的excel、word等文件。"
					}>
					<span
						className="codicon codicon-info ml-2 cursor-pointer"
						style={{ fontSize: "14px", color: "var(--vscode-textLink-foreground)" }}
					/>
				</HeroTooltip>
			</div>
		</div>
	)
}

export default HomeHeader
