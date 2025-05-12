import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState, memo } from "react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { validateApiConfiguration } from "@/utils/validate"
import { vscode } from "@/utils/vscode"
import ApiOptions from "@/components/settings/ApiOptions"
import ClineLogoVariable from "@/assets/ClineLogoVariable"
import { AccountServiceClient } from "@/services/grpc-client"
import { EmptyRequest } from "@shared/proto/common"

const WelcomeView = memo(() => {
	const { apiConfiguration } = useExtensionState()
	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)
	const [showApiOptions, setShowApiOptions] = useState(false)

	const disableLetsGoButton = apiErrorMessage != null

	const handleLogin = () => {
		AccountServiceClient.accountLoginClicked(EmptyRequest.create()).catch((err) =>
			console.error("Failed to get login URL:", err),
		)
	}

	const handleSubmit = () => {
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(apiConfiguration))
	}, [apiConfiguration])

	return (
		<div className="fixed inset-0 p-0 flex flex-col">
			<div className="h-full px-5 overflow-auto">
				{/* <h2>Hi, I'm Cline</h2> */}
				<h2>Hi~, 我是ORKA运营小助手!</h2>
				<div className="flex justify-center my-5">
					<ClineLogoVariable className="size-16" />
				</div>
				{/* <p>
					I can do all kinds of tasks thanks to breakthroughs in{" "}
					<VSCodeLink href="https://www.anthropic.com/claude/sonnet" className="inline">
						Claude 3.7 Sonnet's
					</VSCodeLink>
					agentic coding capabilities and access to tools that let me create & edit files, explore complex projects, use
					a browser, and execute terminal commands <i>(with your permission, of course)</i>. I can even use MCP to
					create new tools and extend my own capabilities.
				</p>

				<p className="text-[var(--vscode-descriptionForeground)]">
					Sign up for an account to get started for free, or use an API key that provides access to models like Claude
					3.7 Sonnet.
				</p>

				<VSCodeButton appearance="primary" onClick={handleLogin} className="w-full mt-1">
					Get Started for Free
				</VSCodeButton> */}

				<p>
					我可以帮您接入公司内部的订单管理系统，一步步完成日常的订单运营工作，包括下单、发货、退货、换货、查询，也可以协助处理本地的excel、word等文件。
				</p>

				<p className="text-[var(--vscode-descriptionForeground)]">
					注册一个账号即可开始使用（免费），注意：需要接入公司内部的订单管理系统，并提供AI大模型API Key。
				</p>

				<VSCodeButton appearance="primary" onClick={handleLogin} className="w-full mt-1">
					注册登录
				</VSCodeButton>

				{!showApiOptions && (
					<VSCodeButton
						appearance="secondary"
						onClick={() => setShowApiOptions(!showApiOptions)}
						className="mt-2.5 w-full">
						{/* Use your own API key */}
						使用自己的API Key
					</VSCodeButton>
				)}

				<div className="mt-4.5">
					{showApiOptions && (
						<div>
							<ApiOptions showModelOptions={false} />
							<VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} className="mt-0.75">
								{/* Let's go! */}
								开始使用
							</VSCodeButton>
						</div>
					)}
				</div>
			</div>
		</div>
	)
})

export default WelcomeView
